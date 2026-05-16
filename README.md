# career-ops

A Claude Cowork plugin that turns your job search into a system. Evaluate job postings, generate ATS-optimized resumes, scan career portals, track applications, and more.

Works for any industry: tech, healthcare, finance, legal, creative, trades, and everything in between.

Adapted from [santifer/career-ops](https://github.com/santifer/career-ops) for Claude Cowork.

## Install

```bash

#note: you will need Claude  code or Gemini CLI with AI enabled in the backend for the plugin to work with local development

# Local development
claude --plugin-dir ./career-ops-plugin-optimised

# Or clone into your plugins directory
git clone https://github.com/Nirali4/secure-career-ops-plugin.git
```
## Security & Cost Optimisation

This fork of **career-ops-plugin** is hardened for enterprise-ready security and cost efficiency.

- **Hardened Fetching (`safeFetch`)**: All URL fetching is routed through `security/validation.js` which enforces **HTTPS only**, validates hostnames against a strict whitelist, and blocks SSRF via manual redirect handling.
- **Aggressive Token Optimization**: To reduce AI costs, all fetched job descriptions are automatically stripped of HTML tags and boilerplate (navbars, footers, etc.) before reaching the AI. This typically reduces input token usage by **50% to 80%**.
- **Enterprise Audit Logging**: A native, zero-token audit logger (`security/audit.js`) records every external fetch event (timestamp, URL, and payload size) to `data/audit.log` for compliance tracking.
- **Anti-Hallucination Guardrails**: The `tailor-resume` skill is hardcoded with strict rules to prevent the AI from inventing facts or lying. It targets an 80-90% ATS match score while maintaining 100% truthfulness.
- **PII Leak Prevention**: A pre-commit hook and `.gitignore` policy ensure the `data/` directory (resumes, evaluations, profile) never leaves your local machine.
- **Static Analysis Verified**: The codebase is refactored to pass standard security scanners (like `graudit`) with zero flags, ensuring robust and clean implementation.

Review `security/validation.js` to adjust the domain whitelist or `security/audit.js` for logging details.

## Quick Start

1. Install the plugin
2. Say **"set up my profile"** and paste your resume
3. Paste a job posting and say **"evaluate this"**
4. Say **"tailor my resume"** for your top matches
5. Say **"help"** anytime to see what's available

## Skills

| Skill | What It Does | Try Saying |
|---|---|---|
| **evaluate** | Score a job posting A-F with detailed analysis | "Evaluate this job posting" |
| **tailor-resume** | ATS-optimized resume for a specific role | "Tailor my resume for Acme" |
| **scan** | Search company career portals | "Scan Stripe for openings" |
| **triage** | Quick-score pipeline from scan results | "Triage my pipeline" |
| **track** | Application tracker with stats | "Show my applications" |
| **apply** | Fill out application forms | "Help me with this application" |
| **research** | Company intelligence brief | "Research this company" |
| **outreach** | Draft LinkedIn/email messages | "Draft outreach to the hiring manager" |
| **compare** | Side-by-side opportunity comparison | "Compare my top options" |

## How Evaluation Works

Paste a job posting (text or URL) and get a full A-F assessment:

- **A. Executive Summary** - Archetype, seniority, one-line verdict
- **B. Background Match** - Every JD requirement mapped to your experience
- **C. Positioning Strategy** - How to present yourself for this specific role
- **D. Compensation & Market** - Salary data and alignment check
- **E. Tailoring Plan** - Specific resume and LinkedIn changes to make
- **F. Interview Prep** - STAR stories mapped to JD requirements

Score from 1.0 to 5.0. Honest, not inflated.

## Industry Support

15 archetypes with specialized evaluation lenses:

Technology, Finance, Healthcare, Legal, Creative/Marketing, Operations,
Sales/BD, Education, Executive, Trades, Customer Success, People/HR,
Government/Nonprofit, Scientific/R&D, Non-Software Engineering

Each archetype adjusts scoring weights and evaluation language for that industry.

## Privacy

Your data stays local. The `data/` directory (profile, applications, resumes)
is excluded from git via `.gitignore`. Nothing is sent to external services
beyond what Claude uses to help you (web searches for salary data, ATS API
calls for job scanning).

## License

MIT. See [ATTRIBUTION.md](ATTRIBUTION.md) for credits.
