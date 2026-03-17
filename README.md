# nfrost.dev

Personal portfolio and resume site for Nick Frost, Engineering Manager.

Built with [Astro 5](https://astro.build) + [Tailwind CSS v4](https://tailwindcss.com). Static output, deployed to [Cloudflare Pages](https://pages.cloudflare.com).

## Commands

| Command           | Action                                       |
| :---------------- | :------------------------------------------- |
| `npm install`     | Install dependencies                         |
| `npm run dev`     | Start local dev server at `localhost:4321`    |
| `npm run build`   | Build production site to `./dist/`           |
| `npm run preview` | Preview build locally before deploying       |

## Project Structure

```
src/
  assets/projects/         Project screenshots
  components/
    ExperienceItem.astro   Timeline entry
    Logo.astro             Reusable NF logo SVG
    ProjectCard.astro      Full-width project row with lightbox
    ResumeLayout.astro     Shared resume layout (paper, header, footer, styles)
    Section.astro          Section wrapper
    TechBadge.astro        Icon + name pill linking to tech site
    ThemeScript.astro      Theme init script (system pref, localStorage, View Transitions)
    icons/                 Globe, Email, GitHub, ThemeIcons
  data/
    resumes/               Tailored resume JSON files (see below)
  layouts/
    Layout.astro           Main site shell (nav, footer, lightbox, scripts)
  lib/
    data.ts                Shared data (skills list)
    techIcons.ts           simple-icons icon/URL maps
  pages/
    404.astro              404 page
    index.astro            Portfolio (hero, about, projects, experience, contact)
    og.png.ts              Generated OG image via satori
    resume/
      index.astro          Master resume
      [slug].astro         Tailored resume (dynamic route from JSON)
      all.astro            Dashboard listing all tailored resumes
  styles/
    global.css             Tailwind, font, light/dark theme, all custom CSS
public/
  favicon.svg              Blue NF logo (light mode)
  favicon-dark.svg         White NF logo (dark mode)
  robots.txt
```

## Tailored Resumes

The resume system supports creating tailored versions for specific job applications while keeping a master resume at `/resume`.

### How it works

1. The master resume lives at `src/pages/resume/index.astro` with default experience, projects, and skills data.
2. Tailored resumes are JSON files in `src/data/resumes/`. Each file generates a page at `/resume/[filename]`.
3. A dashboard at `/resume/all` lists all tailored resumes with their status.

### Creating a tailored resume

1. Copy `src/data/resumes/_example.json` to a new file (e.g., `acme-corp.json`). Files prefixed with `_` are ignored.
2. Edit the JSON to tailor experience bullets, projects, and skills for the role.
3. Run `npm run build` (or let the dev server pick it up). The resume will be available at `/resume/acme-corp`.

### JSON schema

```json
{
  "company": "Company Name",
  "position": "Job Title",
  "applied": "2026-03-17",
  "status": "applied",
  "url": "https://example.com/jobs/123",
  "experience": [
    {
      "company": "Employer Name",
      "role": "Your Role",
      "period": "2022 - 2025",
      "bullets": ["Achievement 1", "Achievement 2"]
    }
  ],
  "projects": [
    {
      "name": "Project Name",
      "company": "Employer Name",
      "tech": "Vue.js, Laravel, etc.",
      "description": "What the project does."
    }
  ],
  "skills": [
    { "category": "Languages", "items": ["JavaScript", "TypeScript"] }
  ]
}
```

**Fields:**

| Field        | Description                                                    |
| :----------- | :------------------------------------------------------------- |
| `company`    | Company you're applying to                                     |
| `position`   | Job title                                                      |
| `applied`    | Date applied (YYYY-MM-DD), used for sorting on the list page   |
| `status`     | One of: `applied`, `interviewing`, `offered`, `rejected`, `withdrawn` |
| `url`        | Link to the job posting                                        |
| `experience` | Full replacement of the experience section                     |
| `projects`   | Full replacement of the notable projects section               |
| `skills`     | Full replacement of the skills section                         |

All override arrays are full replacements, not diffs. Copy the master data from `resume/index.astro` as your starting point and modify from there.

### Privacy

Tailored resumes have `noindex` meta tags and are excluded from the sitemap. The `/resume/all` dashboard is also excluded. Only the master `/resume` is indexed.
