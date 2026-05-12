// security/audit.js
const fs = require('fs');
const path = require('path');

const LOG_DIR = path.join(__dirname, '..', 'data');
const LOG_FILE = path.join(LOG_DIR, 'audit.log');

/**
 * Log an action to the audit log natively.
 * @param {string} action The type of action (e.g., 'NETWORK_FETCH')
 * @param {object} details Additional metadata about the action
 */
function logAction(action, details = {}) {
  try {
    // Ensure the data directory exists
    if (!fs.existsSync(LOG_DIR)) {
      fs.mkdirSync(LOG_DIR, { recursive: true });
    }

    const logEntry = {
      timestamp: new Date().toISOString(),
      action,
      ...details
    };

    fs.appendFileSync(LOG_FILE, JSON.stringify(logEntry) + '\n');
  } catch (error) {
    // Fail silently so logging doesn't crash the plugin execution
    console.error('Failed to write to audit log:', error);
  }
}

module.exports = { logAction };
