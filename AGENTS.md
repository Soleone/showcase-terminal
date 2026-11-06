# showcase-terminal

Builds a static page that runs a CLI in the visitor's browser (WebContainers). `README.md` is the full `terminal.json` reference; keep it in step with the code.

- No runtime dependencies. Node 22+, ESM, `node:` imports, tests with `node --test` (`npm test`).
- `src/terminal.js` builds and serves the page, `bin/showcase-terminal.js` is the CLI, `page/` holds what is copied into every build (`index.html`, the plain themes, the terminal font).
- The project's facts come from its `showcase.json`, the public contract of [showcase](https://github.com/Soleone/showcase). Read it as plain JSON; never depend on `@soleone/showcase`.
- The sandbox's `~/.config/showcase/theme.json` is read by projects' `onTheme` commands: don't move it.
- Try a change against a real recipe with `showcase-terminal <project>/demo/browser --out /tmp/x --serve` before releasing. Never write into another project's repo unless asked.
- Conventional Commits. Releases run locally: `pnpm release`, pick the version at the prompt.
