---
name: update-portfolio
description: Add or edit entries in the portfolio data layer (projects, experience, certificates) and handle any associated public assets. Use when adding a new project, job, or certificate.
---

1. Read the relevant data file to understand the current type shape and existing entries:
   - Projects: `data/projects.ts`
   - Experience: `data/experience.ts`
   - Certificates: `data/certificates.ts`

2. For certificates: copy the PDF to `public/certificates/` using a kebab-case filename (e.g., `my-cert-name.pdf`), then add the entry to `data/certificates.ts`.

3. For projects: confirm all required fields (`name`, `description`, `tech`, links). Place screenshots in `public/` with descriptive kebab-case names. Add an optional `video` field if a demo link exists.

4. For experience: follow the existing structure in `data/experience.ts` exactly.

5. After editing, visually verify the TypeScript types are correct — `typescript.ignoreBuildErrors: true` means a build will not catch type errors.

6. Do not run `git push` without explicit user confirmation (per project rules).
