---
name: scan
description: "Scan company career pages and ATS portals for job openings that match your profile. Supports Greenhouse, Lever, Ashby, SmartRecruiters, and Workday APIs. Use when someone says 'scan for jobs', 'check careers page', 'find openings at', or 'search for roles'."
argument-hint: "<company name, careers URL, or 'all' to scan watchlist>"
user-invocable: true
allowed-tools:
  - Read
  - Write
  - WebFetch
  - WebSearch
  - Glob
---

# Scan for Job Openings

Search company career portals for roles matching your profile.
Read references/ats-endpoints.md for API details.

## Step 0: Load Context

1. Read `data/profile.yml` for target roles, skills, seniority
2. Read `config/portals.yml` if it exists (company watchlist)
3. Read `data/scan-history.md` if it exists (dedup against seen postings)
4. Read `data/applications.md` to exclude roles already tracked

## Step 1: Determine What to Scan

Parse user input:

- **Company name:** Look up in portals.yml for ATS type and slug.
  If not found, use WebSearch to find their careers page and detect ATS.
- **URL:** Detect ATS type from URL pattern:
  - `boards.greenhouse.io/{slug}` or `{company}.greenhouse.io` -> Greenhouse
  - `jobs.lever.co/{slug}` -> Lever
  - `jobs.ashbyhq.com/{slug}` or `{company}.ashbyhq.com` -> Ashby
  - `jobs.smartrecruiters.com/{slug}` -> SmartRecruiters
  - Other -> attempt WebFetch on the page
- **"all" / "scan my watchlist":** Scan every enabled company in portals.yml.
  If no portals.yml exists, tell the user:
  > "You don't have a company watchlist yet. Tell me some companies
  > you're interested in and I'll set one up."
- **"scan {industry}":** Use WebSearch to find companies hiring in that
  industry, then scan their career pages.

## Step 2: Fetch Job Listings

### Tier 1: JSON API (preferred, fast, structured)

Use WebFetch to call these endpoints. See references/ats-endpoints.md for details.

**Greenhouse:**
`GET https://boards-api.greenhouse.io/v1/boards/{slug}/jobs?content=true`

**Lever:**
`GET https://api.lever.co/v0/postings/{slug}`

**Ashby:**
`GET https://api.ashbyhq.com/posting-api/job-board/{slug}?includeCompensation=true`

**SmartRecruiters:**
`GET https://api.smartrecruiters.com/v1/companies/{slug}/postings`

Parse the JSON response. Extract: title, location, department, URL, description.

### Tier 2: WebFetch for HTML career pages

If the company uses a non-API ATS or custom career page, use WebFetch
to retrieve the HTML. Parse job listings from the page content.

### Tier 3: Fallback

If WebFetch is unavailable or the page requires JavaScript:
> "I can't scan {company}'s career page automatically. Here's their
> careers URL: {url}. You can browse it and paste any interesting
> job postings for me to evaluate."

## Step 3: Filter & Match

For each job listing found:

1. **Title relevance:** Compare against target roles from profile.yml
   - Match target role keywords (primary + secondary roles)
   - Exclude roles that don't match seniority level
   - Exclude titles with negative keywords if profile has exclude_keywords

2. **Quick relevance score (0-10):**
   - Title match to target roles: 0-4 points
   - Skills/keyword overlap with profile: 0-3 points
   - Location/remote match: 0-2 points
   - Seniority alignment: 0-1 point

3. **Dedup:**
   - Check URL against `data/scan-history.md` (skip if seen)
   - Check company + title against `data/applications.md` (skip if tracked)

## Step 4: Output

```
## Scan Results: {Company} - {date}

Found **{X}** openings, **{Y}** match your profile.

### Matches (by relevance)

| # | Role | Location | Relevance | Link |
|---|---|---|---|---|
| 1 | {title} | {location} | {score}/10 | {URL} |
| 2 | ... | ... | ... | ... |

### Filtered Out ({Z} roles)
{Brief list: "3 junior roles, 2 in unrelated departments, 1 requires
relocation to {city}"}
```

## Step 5: Save & Next Steps

Add all matches to `data/pipeline.md` (create if doesn't exist):

```markdown
# Job Pipeline

| Date Found | Company | Role | Relevance | URL | Status |
|---|---|---|---|---|---|
| {today} | {company} | {title} | {score}/10 | {url} | New |
```

Log ALL seen postings (matches + filtered) to `data/scan-history.md`:

```markdown
| Date | Company | Role | URL | Action |
|---|---|---|---|---|
| {today} | {company} | {title} | {url} | Matched / Filtered: {reason} |
```

> "Found {Y} matching roles at {company}.
>
> Want me to:
> - **Evaluate** the top match? Say 'evaluate #1'
> - **Triage** the full pipeline? Say 'triage my pipeline'
> - **Scan** another company? Say 'scan {company}'"
