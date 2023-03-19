# 待辦事項清單 API

這個專案是一個線上待辦事項清單應用程式的後端 API，使用 Node.js、Express 和 MongoDB 進行開發。使用者可以通過 Google 註冊和登入，也可以使用電子郵件和密碼進行註冊和登入。每個使用者都有自己獨立的待辦事項清單，可以新增、刪除、修改和讀取待辦事項，並控制它們的排序。

## 功能

- 使用者註冊和登入
- Google 登入
- 新增、讀取、更新和刪除待辦事項
- 更新待辦事項完成狀態
- 使用者可以對待辦事項進行排序

## 開始使用

1. clone 此專案到本地端：

```bash
git clone https://github.com/your-username/todo-list-api.git
cd todo-list-api
```

2. 安裝相依套件：

```bash
npm install
```

3. 建立 `.env` 檔案，並設置相應的環境變量：

```makefile
DB_CONNECTION_STRING=<Your MongoDB connection string>
JWT_SECRET=<Your JWT secret>
GOOGLE_CLIENT_ID=<Your Google OAuth client ID>
```

4. 啟動伺服器：
```bash
npm start
```
5. API 伺服器將在 http://localhost:3000 啟動，並且可以使用 Postman 或其他 API 測試工具進行測試。

## API 檔案

本專案提供 Swagger 檔案，以方便您查閱和測試 API。請查看 auth.yaml 和 todo.yaml 以獲取詳細的 API 資訊。

## 作者
chatGPT v4 & rayatn1011

## 許可
本專案使用 MIT 許可。

請注意，本專案僅供學習和參考之用。在實際生產環境中使用前，請確保對其進行充分的安全審查和測試。