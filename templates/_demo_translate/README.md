# Translate Extension Mau

Ban mau chuan danh cho extension dich van ban.

## Files

- `plugin.json` - metadata, script mapping, va config runtime.
- `src/language.js` - tra ve danh sach ngon ngu.
- `src/language_list.js` - du lieu ngon ngu.
- `src/config.js` - helper doc config global, multi-line list, number.
- `src/translate.js` - dich text voi contract `execute(text, from, to, apiKey)`.

## Contract

```text
language.js: execute() -> [{id}, ...]
translate.js: execute(text, from, to, apiKey) -> translated string
```

## Config

Translate extensions can declare primitive config flags directly under `plugin.json.config`:

- `support_auto_detect`: boolean.
- `max_line`: max lines per request.
- `max_length`: max characters per request.
- `required_api_key`: whether app should require API key.
- `support_url`: provider URL.

User-entered values such as API keys should use object config items with `title`, `mode`, `format`, and `default`.
`default` is optional. Multi-line text fields can be parsed with `configList`.
