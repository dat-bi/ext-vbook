# TTS Extension Mau

Ban mau chuan danh cho extension doc truyen bang Text-to-Speech.

## Files

- `plugin.json` - metadata, script mapping, va config runtime.
- `src/voice.js` - tra ve danh sach voice.
- `src/voice_list.js` - du lieu voice.
- `src/tts.js` - tra ve audio base64 voi contract `execute(text, voice)`.

## Contract

```text
voice.js: execute() -> [{id, language}, ...]
tts.js: execute(text, voice) -> audio base64 string
```

## Config

TTS extensions can declare primitive config flags directly under `plugin.json.config`:

- `preload_size`: number of chunks the app may preload.
- `max_length`: max characters per TTS request.
- `required_api_key`: whether app should require API key.
- `support_url`: provider URL.

If a provider needs cookies, API keys, host, model, or voice options from the user, add object config fields with `title`, `mode`, `format`, and `default`.
