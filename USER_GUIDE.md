# Career-Ops Plugin: Quick Start Guide

Welcome! This AI assistant helps you land your next job by acting as your personal career strategist. This work is an enhanced version of the original Career-Ops plugin byAndrew Shwetzer in terms of Security and efficiency. It can rate your match for a job, tailor your resume, and even help track your applications. 

## Step 0: Installation
Before you can use these commands, you need to load the plugin into your Claude AI tool:

1. **Find your folder**: Make sure you know where you downloaded this `career-ops-plugin` folder.
2. **Open Claude**: Open your Claude Desktop app or the Cowork interface.
3. **Load the Plugin**: 
   - If using the **Command Line**, type: `claude --plugin-dir ./career-ops-plugin`
   - If using the **Menu**, go to "Add Plugin" and select this folder.

---
## Step 1: Tell it about yourself
Before the AI can help you, it needs to know what you do.
1. Open your chat.
2. Type: **"Set up my profile"**
3. The AI will ask you to paste your current resume. Paste the text of your resume and hit enter. 

## Step 2: Rate a Job Posting
Found a job you like? Let the AI tell you if it's a good fit.
1. Copy the link (URL) of the job, or copy the entire text of the job description.
2. Type: **"Evaluate this job:"** and paste the link or text.
   - *Example: "Evaluate this job: https://boards-api.greenhouse.io/v1/boards/acme/jobs/12345"*
3. The AI will give you an honest **A through F score** on how well you match, along with interview prep ideas!

## Step 3: Tailor your Resume
If the job looks like a great fit, you can ask the AI to rewrite your resume specifically for that job.
1. Type: **"Tailor my resume for that job"**
2. The AI will output a brand new, ATS-friendly version of your resume perfectly matched to the job description you just evaluated.

---

### Other Helpful Commands to Try:
- **"Help"** — Shows you a list of everything the AI can do.
- **"Research Stripe"** — Gives you a quick intelligence brief on a company, including recent news and culture.
- **"Draft an outreach message to the hiring manager"** — Writes a short LinkedIn message you can send to get noticed.

*Note: Your personal data (like your resume) never leaves your computer and is stored securely in your local `data/` folder!*
