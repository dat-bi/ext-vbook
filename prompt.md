# VBook Session Prompts

## Prompt Chung Dau Phien

```text
Hay bat dau phien VBook dung quy trinh.

1. Goi MCP tool `bootstrap_session` truoc.
2. Sau do goi `check_env`.
3. Doc va tuan thu context da duoc bootstrap, dac biet:
   - khong doan selector
   - khong viet code neu chua co du lieu that
   - Playwright/Chrome chi dung cho discovery
   - VBook debug la kiem tra cuoi cung
4. Neu sua extension: doc plugin.json/src lien quan, reproduce loi bang debug, roi moi sua.
5. Neu tao extension moi: dung create_extension_flow, hoi toi du URL can thiet neu thieu.
6. Khong build/publish neu validate/debug/test_all chua pass.
```

## Prompt Sua Extension

```text
Sua extension `<ten-extension>` theo dung workflow VBook.

Bat dau bang `bootstrap_session` voi extension_name la `<ten-extension>`, roi `check_env`.
Sau do doc plugin.json va cac file src lien quan, chay debug de reproduce loi that.
Khong doan selector. Neu site kho, dung hard-site playbook, Node/Playwright/Chrome discovery neu can, roi convert ve Rhino-safe script.
Sau khi sua: validate, debug script loi, test_all neu kha thi. Chi build/publish khi moi buoc pass.
```

## Prompt Tao Extension Moi

```text
Tao extension VBook moi cho site `<site-url>` theo dung workflow.

Bat dau bang `bootstrap_session`, roi `check_env`, sau do dung `create_extension_flow`.
Neu thieu thong tin, hay hoi toi day du: ten extension, type, tag, listing URL, detail URL, toc URL neu khac, chapter URL, co search khong, co genre khong.
Khong viet selector tu suy doan. Phai inspect/discover du lieu that truoc khi viet src/*.js.
Sau khi code: validate, debug tung script chinh, roi test_all.
```

## Prompt Toi Thieu

```text
Bat dau phien VBook: goi `bootstrap_session` truoc, roi `check_env`, sau do lam dung workflow trong context. Khong doan selector, khong publish neu chua test tren VBook.
```
