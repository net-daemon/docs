# AGENTS.MD

Guidance for AI coding agents working in this repository.

## Project Overview

This repository contains the NetDaemon documentation site. It is a Docusaurus 3 static site hosted on Netlify.

Primary areas:

- `docs/` - documentation pages, mostly Markdown.
- `sidebars.js` - documentation navigation and sidebar structure.
- `docusaurus.config.js` - site metadata, navbar, footer, Docusaurus presets, themes, Prism languages, and search config.
- `src/pages/` - custom React pages for the site.
- `src/css/custom.css` - global Docusaurus theme overrides.
- `static/` - images, favicons, redirects, and other static assets.

## Tooling

- Use Node 20 when possible. The repo has `.nvmrc` set to `20`; `package.json` allows Node `>=18.0.0`.
- Use Yarn v1. The scripts are defined in `package.json`.
- `yarn.lock` is ignored by Git in this repo. Do not assume lockfile changes will be part of a commit unless the ignore policy changes.

Common commands:

```bash
yarn install
yarn start
yarn build
yarn serve
```

Use `yarn build` as the main validation command before finishing changes that affect docs, config, navigation, styles, assets, or dependencies.

## Editing Guidelines

- Keep documentation changes scoped and factual. This is user-facing product documentation, not an implementation scratchpad.
- Preserve existing page structure and heading style unless a restructuring is part of the task.
- When adding or renaming docs pages, update `sidebars.js` so the page is reachable from navigation.
- When moving or deleting docs pages, check links and sidebar IDs. Docusaurus document IDs may differ from filenames when front matter defines an explicit ID.
- Use relative links for internal docs links where practical.
- Put images and other static files under `static/`, then reference them using site-root paths such as `/img/example.png`.
- Mermaid diagrams are enabled. Use fenced `mermaid` blocks for diagrams.
- C# and PowerShell syntax highlighting are configured in `docusaurus.config.js`; prefer explicit language tags on code blocks.
- Keep generated output out of commits: `build/`, `.docusaurus/`, `node_modules/`, and other ignored artifacts should remain untracked.

## Dependency Changes

- Keep Docusaurus packages aligned to the same version:
  - `@docusaurus/core`
  - `@docusaurus/preset-classic`
  - `@docusaurus/theme-mermaid`
- After dependency updates, run `yarn build`.
- If updating dependencies, check current package metadata first rather than assuming known versions are current.
- The local search package is `@easyops-cn/docusaurus-search-local`; verify compatibility before changing major Docusaurus versions or replacing search behavior.

## Validation Checklist

Before handing off, run the smallest useful validation for the change:

- Docs-only Markdown change: `yarn build`.
- Sidebar, Docusaurus config, React page, CSS, or dependency change: `yarn build`.
- Visual/layout-sensitive change: also run `yarn start` and inspect the affected page in a browser when available.

Known benign warnings may appear from Yarn cache location or Docusaurus update checks in restricted environments. Treat build failures, broken links, missing docs IDs, and Markdown/MDX syntax errors as real issues to fix.

## Collaboration Notes

- Do not revert unrelated local changes.
- Prefer focused diffs over broad formatting churn.
- Do not edit generated files by hand.
- If a task requires deleting docs or assets, confirm that no sidebar entries, Markdown links, or static references still point to them.
