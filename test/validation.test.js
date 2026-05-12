// test/validation.test.js
// Simple tests for validateUrl and safeFetch (mocked)
const { validateUrl, safeFetch } = require('../security/validation');
const assert = require('assert');

// Mock fetch globally for safeFetch tests
global.fetch = async (url, options) => {
  return {
    ok: true,
    status: 200,
    body: {
      async *[Symbol.asyncIterator]() {
        // simulate a small payload
        yield Buffer.from('<!DOCTYPE html><html><body><p>Hello</p></body></html>');
      },
      getReader() {
        const chunks = [Buffer.from('<html><script>malicious()</script></html>')];
        let i = 0;
        return {
          async read() {
            if (i < chunks.length) {
              return { done: false, value: chunks[i++] };
            }
            return { done: true };
          }
        };
      }
    }
  };
};

// Test allowed hostname
assert.doesNotThrow(() => {
  const url = validateUrl('https://boards-api.greenhouse.io/v1/boards/acme/jobs');
  assert.strictEqual(url.hostname, 'boards-api.greenhouse.io');
}, 'Allowed hostname should not throw');

// Test disallowed hostname
assert.throws(() => {
  validateUrl('https://evil.com/malicious');
}, /Domain not allowed/, 'Disallowed hostname should throw');

// Test safeFetch sanitisation (script removal)
(async () => {
  const result = await safeFetch('https://boards-api.greenhouse.io/v1/boards/acme/jobs');
  assert(!result.includes('<script'), 'Script tags should be stripped');
  console.log('All validation tests passed');
})();
