# 00_BOOTSTRAP.md - Start Here

Read this at the start of every AI session.

## Session Rules

- Load these docs before work:
  - `01_runtime.md`
  - `02_workflow.md`
  - `03_HARD_SITES.md` for hard websites
  - `04_demo.md`
  - `05_repair.md` for fixes
- Read `01_runtime_api.md` before using unfamiliar APIs such as Browser, Graphics, Blob, WebSocket, storage, media, or advanced `Http` helpers.
- Run `check_env` before any device-dependent action.
- Do not guess selectors.
- Do not publish without a passing device test.
- Keep changes scoped to the requested extension/tooling.

## Required First Decision

Choose one:

1. New extension -> follow `02_workflow.md` New Extension Flow.
2. Repair extension -> follow `05_repair.md`.
3. Tooling/docs change -> edit only `vbook-tool` unless asked otherwise.
4. Registry/publish work -> validate, test, build, then publish.

## Device Rule

If `check_env` cannot reach VBook:

```text
DEVICE UNREACHABLE. Please open VBook -> Web Server, check the current IP/port, update vbook-tool/.env, then ask me to retry.
```

Stop there. Do not guess or repair without real device output.

## Discovery Rule

For normal static pages:

```text
fetch -> res.html() -> selectors -> debug
```

For hard pages:

```text
Node/Playwright/Chrome discovery -> API/DOM strategy -> Rhino-safe script -> VBook debug
```

Playwright or Chrome DevTools results are discovery evidence only. VBook `debug` is the final runtime check.

## Minimum Done Criteria

For code changes:

- `validate` run.
- relevant `debug` run when device is available.
- `test_all` run for behavior changes when feasible.
- version bumped only when building/publishing a changed extension.
