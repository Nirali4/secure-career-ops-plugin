---
name: tailor-resume
description: "Generate an ATS-optimized resume tailored to a specific job posting. Creates clean HTML you can print to PDF. Works for any industry. Use when someone says 'tailor my resume', 'make me a resume', 'create a resume for', or 'update my resume for'."
argument-hint: "<company name or 'for the latest evaluation'>"
user-invocable: true
allowed-tools:
  - Read
  - Write
  - Glob
---

# Tailor Your Resume

Generate an ATS-optimized resume customized for a specific job posting.
Read references/ats-rules.md before generating any HTML.

## Step 0: Load Context

1. Read `data/profile.yml` for structured background data
2. Read `data/resume.md` if it exists (full resume text for detail)
3. Find the target evaluation:
   - If the user specified a company/role, search `data/evaluations/` for a match
   - If "latest" or no argument, use the most recent evaluation file
   - If ambiguous, list recent evaluations and ask which one
4. If no evaluation exists:
   > "I need to evaluate the job first so I know what to emphasize.
   > Paste the job posting and I'll assess it, then generate your resume."

## Step 1: Keyword Extraction

From the evaluation + JD, extract 15-20 keywords that ATS systems scan for:

- Exact phrases from "Required Qualifications" (highest priority)
- Industry-standard terms (not creative synonyms)
- Certifications, tools, methodologies named in the JD
- Action verbs that match the responsibilities section

## Step 2: Strict Anti-Hallucination & ATS Match Target (80-90%)

You MUST optimize the resume to hit an **80-90% ATS match score** (similar to Jobscan) by integrating the extracted keywords. However, you are bound by these strict rules:
1. **Never invent experience, skills, or metrics.** Only use facts explicitly stated in the provided profile/resume.
2. **Address missing skills honestly.** If highly important skills or tools from the JD are missing in the candidate's experience, do NOT lie by adding them to past job responsibilities. Instead, add a generic, truthful phrasing such as "Have knowledge of [Skill A, Skill B]" or "Familiar with [Tool C]" in the Skills or Summary section. This ensures the ATS keywords are present without fabricating past work experience.
3. **Enhance, don't fabricate.** Rewrite existing bullets to mirror the exact phrasing and terminology of the JD (e.g., change "Managed team" to "Directed cross-functional team" if the JD uses that phrasing AND it remains truthful).
4. **Natural Keyword Integration:** Weave keywords naturally into the Professional Summary and Skills sections to boost the ATS score without keyword stuffing.

## Step 3: Detect Language & Locale

- JD in English + US company: Letter paper (8.5" x 11")
- JD in English + non-US: A4
- JD in another language: match that language, use A4
- Resume language MUST match JD language

## Step 4: Build Resume Content

Using the evaluation's Block E (Tailoring Plan) as a guide, construct
each resume section from profile data:

### Professional Summary (3-4 lines)
- Open with years of experience + core identity
- Include 3-5 top keywords from the JD naturally
- End with a forward-looking statement connecting to this specific role
- Use the narrative.headline from profile as a starting point

### Experience Section
- Include all roles from work_history, most relevant FIRST
- For each role: Company, Title, Dates on one line
- 3-5 bullets per role, ordered by relevance to THIS JD
- Each bullet: Action verb + what you did + quantified result
- Mirror JD language exactly (if JD says "project management",
  write "project management", not "programme management")
- Pull specific numbers from proof_points and work_history highlights

### Education Section
- Degree, School, Year
- Include relevant coursework or honors only if recent grad

### Skills Section
- List JD keywords FIRST, then additional skills
- Group by category if 10+ skills (Technical, Tools, Methodologies, etc.)
- Include both acronym and full form: "Search Engine Optimization (SEO)"

### Certifications Section (if applicable)
- From credentials in profile
- Include status, jurisdiction, number if relevant

### Projects / Portfolio (if applicable and relevant)
- Only include if the archetype values it (Creative, Technology)
- Brief description + link + key metric

## Step 5: Generate HTML

Read the template from references/resume-template.html.

Fill all `{{PLACEHOLDER}}` slots with the generated content.

ATS compliance rules (from references/ats-rules.md):
- Single column ONLY
- Standard section headers exactly: "Experience", "Education", "Skills"
- No images, icons, or graphics
- All text selectable (no text-in-images)
- Standard fonts: Arial, Calibri, Georgia, or system sans-serif
- Font size: 10-12pt body, 14-16pt name
- Margins: 0.5-1 inch
- No headers/footers (ATS strips them)
- Max 2 pages

## Step 6: Output

Write the HTML to `data/resumes/{company-slug}-{role-slug}.html`.

Show the user a preview of the content (not the HTML code):

```
## Resume Preview: {Name} - {Target Role} at {Company}

**Summary:** {first 2 lines}

**Experience:**
- {Role 1} at {Company} ({dates}) - {first bullet}
- {Role 2} at {Company} ({dates}) - {first bullet}

**Skills:** {top 10}

**Keywords matched:** {n}/20 from the JD
```

## Step 7: PDF Instructions

> "Your tailored resume is saved at `data/resumes/{filename}.html`.
>
> **To save as PDF:**
> 1. Open the file in your browser (double-click it)
> 2. Press **Cmd+P** (Mac) or **Ctrl+P** (Windows)
> 3. Select **Save as PDF**
> 4. Done!
>
> The HTML is designed to print cleanly. What you see is what you get."

## Step 8: Update Tracker

Update the matching row in `data/applications.md`:
- Status: "Resume Ready" (if currently "Evaluated")
- Notes: append "Resume: {filename}"

## Step 9: Next Steps

> "Resume is ready! Next steps:
> - **Review it** by opening the HTML file
> - **Apply** by saying 'help me with the {company} application'
> - **Compare** this role with others: 'compare my options'"
