# 02_workflow.md - Required AI Workflow

This workflow is mandatory for AI agents. Do not skip steps.

## Prime Rules

- No real device data -> do not write selectors.
- `check_env` fails -> stop and ask user to update `VBOOK_IP`.
- `validate` has errors -> do not debug.
- `debug` fails -> do not run `test_all`.
- `test_all` fails -> do not build or publish.
- Playwright/Chrome discovery can guide code, but VBook `debug` is the final truth.

## New Extension Flow

1. `read_context("00_BOOTSTRAP.md")`
2. `check_env`
3. `create_extension_flow(site_url)`
4. If status is `need_answers`, ask the user for all requested URLs.
5. Diagnose with `analyze`, `inspect`, DOM tree, Node preflight, or Playwright/Chrome discovery.
6. Write scripts with real selectors or real API findings.
7. `validate`
8. `debug` important scripts individually:
   - `detail.js`
   - `page.js`
   - `toc.js`
   - `chap.js`
   - `gen.js` / `search.js` if present
9. `test_all`
10. `build --bump` or `publish`

## Repair Flow

1. `read_context("00_BOOTSTRAP.md")`
2. `check_env`
3. Read:
   - `extensions/<name>/plugin.json`
   - relevant `extensions/<name>/src/*.js`
4. Reproduce failure with `debug --json`.
5. Inspect/discover the current website structure.
6. Fix only the failing scripts/config.
7. `validate`
8. Re-run the failing `debug`.
9. `test_all --from <fixed_step>`
10. `build --bump`
11. `publish`

## Required User Answers For New Sites

Ask for these when `create_extension_flow` needs answers:

1. Extension name.
2. Type: `novel`, `comic`, `video`, `chinese_novel`, `translate`, `tts`.
3. Tag: normal or `nsfw`.
4. Listing/home URL.
5. Detail URL for one real item.
6. TOC URL if different from detail.
7. Chapter/read URL.
8. Search support: yes/no.
9. Genre support: yes/no.

## Tool Order

```text
bootstrap/read_context
-> check_env
-> create/read extension
-> collect URLs
-> diagnose/discover/inspect
-> write scripts
-> validate
-> debug
-> test_all
-> build/publish
```

## Stop Conditions

Stop and report exactly what is missing when:

- Device is unreachable.
- Required URL is missing.
- Site requires login/captcha that the tool cannot bypass.
- Debug output has an exception not yet fixed.
- The script uses guessed/generic selectors.
