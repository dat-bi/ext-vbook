# vbook-proxy-collector

Node.js proxy/collector để **VS Code extension** gửi `/test` vào đây, server sẽ **forward** sang điện thoại (Vbook App) và **lưu lại request/response** để AI đọc.

## Cấu hình

Mặc định:

- Proxy listen: `0.0.0.0:18080`
- Upstream (điện thoại): `192.168.0.40:8080`

Có thể đổi bằng env:

- `HOST` (mặc định `0.0.0.0`)
- `PORT` (mặc định `18080`)
- `TARGET_HOST` (IP điện thoại)
- `TARGET_PORT` (mặc định `8080`)

## Chạy

### Cách 1: Dùng file .env (khuyên dùng)

1. Tạo file `.env` từ file mẫu:

```
copy .env.example .env
```

2. Sửa `.env` và set `TARGET_HOST` = IP điện thoại của bạn.

   (Tuỳ chọn) chỉnh `MAX_LOG_CHARS` để giới hạn kích thước log lưu vào `.jsonl`.

   (Tuỳ chọn) chỉnh `LOG_LEVEL`:

   - `ai` (mặc định): log gọn cho AI (status/log/result/data), không lưu raw headers.
   - `full`: log đầy đủ (incoming headers + dataDecoded + upstream_raw) để debug sâu.

3. Cài deps và chạy:

```bash
npm install
npm start
```

### Cách 2: Set env thủ công

1. Cài deps

```bash
npm install
```

2. Chạy server

```bash
# ví dụ: điện thoại 192.168.0.40
set TARGET_HOST=192.168.0.40
set TARGET_PORT=8080
set PORT=18080
npm start
```

## Dùng với VS Code extension

- Khi chạy `VBook: Debugger Script` (hoặc Oneclick Test), ở ô **Nhập IP server** nhập:

```
<PC-IP>:18080
```

Ví dụ:

```
192.168.0.197:18080
```

Lưu ý:

- Extension vẫn mở file-server ở `http://<PC-IP>:8080` để điện thoại tải file `.js`.
- Proxy chạy `18080` nên không đụng cổng với extension.

Workflow:

- Direct mode (không dùng proxy): nhập `IP_điện_thoại` ở ô "Nhập IP server".
- Proxy mode (khuyên dùng để debug): nhập `IP_PC:18080` để proxy lưu request/response theo session.

## API để AI đọc

- `GET /health`
- `GET /sessions`
- `GET /sessions/:id`
- `GET /sessions/:id/latest`

Dữ liệu được lưu dạng JSON Lines tại:

- `proxy-collector/data/<sessionId>.jsonl`

## AI auto-debug CLI

CLI này đọc session từ proxy và gọi LLM để tóm tắt + gợi ý fix script/selector.

1. Cấu hình `.env`:

- `AI_API_KEY`: API key (không commit)
- `AI_BASE_URL`: OpenAI-compatible base url (mặc định `https://api.openai.com`)
- `AI_MODEL`: model (mặc định `gpt-4o-mini`)

2. Chạy:

```bash
# phân tích session mới nhất
npm run ai

# phân tích session cụ thể
npm run ai:cli -- --session <sessionId>

# in raw report (không gọi LLM)
npm run ai:cli -- --latest --no-llm --json
```

## Troubleshooting

- Nếu thấy `Proxy upstream error`: kiểm tra `TARGET_HOST` (IP điện thoại) và điện thoại đang bật debug server cổng `8080`.
- Nếu file `.jsonl` quá to: giảm log trong script (tránh `console.log(doc)`), hoặc giảm `MAX_LOG_CHARS` trong `.env`.
- Nếu cần soi raw HTTP/headers: set `LOG_LEVEL=full` rồi test lại.
