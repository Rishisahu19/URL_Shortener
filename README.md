# 🔗 Mini URL Shortener API

A simple RESTful API that shortens long URLs into short, shareable links. Built using **Node.js**, **Express.js**, and **MongoDB**.

## 📦 Tech Stack

- **Language**: JavaScript (Node.js)
- **Framework**: Express.js
- **Database**: MongoDB (via Mongoose)
- **Utilities**:
  - `nanoid` for generating short codes
  - `valid-url` for URL validation
  - `express-rate-limit` for basic rate limiting

---

## 🚀 Features

- Shortens long URLs
- Redirects short code to the original URL
- URL expiry support (default: 10 days)
- Prevents duplication of short URLs
- Tracks number of clicks
- Simple rate limiting

---

## 📁 Project Structure

```
.
├── src/
│   ├── config/
│   │   └── db.js              # MongoDB connection
│   ├── controllers/
│   │   └── urlController.js   # Business logic
│   ├── models/
│   │   └── Url.js             # Mongoose schema
│   ├── routes/
│   │   └── urlRoutes.js       # API routes
│   └── server.js              # Entry point
├── .env                       # Environment variables
├── .gitignore
├── package.json
└── README.md
```

---

## 📌 API Endpoints

### ✅ POST `/shorten`

**Request**:
```json
{
  "url": "https://example.com/long/link",
  "expiryDate": "2025-07-20" // (optional)
}
```

**Response**:
```json
{
  "shortUrl": "https://short.ly/abc123"
}
```

### ✅ GET `/:code`

**Action**: Redirects to the original URL

- Returns 404 if not found
- Returns 410 if expired
- Tracks clicks

---

## ⚙️ Setup & Run

### 1. Clone the Repository
```bash
git clone https://github.com/Rishisahu19/URL_Shortener.git
cd URL_Shortener
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the root:
```
PORT=5000
MONGO_URI=mongodb://localhost:27017/URL_SHORTENER
BASE_URL=https://short.ly
```

### 4. Start the Server

For development:
```bash
npm run start
```

For production:
```bash
node src/server.js
```

---

## 🧪 Testing with Postman

### ➕ POST `/shorten`
```http
POST http://localhost:5000/shorten
Content-Type: application/json

{
  "url": "https://example.com"
}
```

### 🔁 GET `/:code`
```http
GET http://localhost:5000/abc123
```

### 🔍 GET `/api/fetch` (optional)
Returns all entries in the database for debugging.

---

## 📊 Bonus Features

- ✅ **Rate Limiting**: Max 5 shorten requests/minute
- ✅ **Expiration**: Auto-expires links after 10 days (customizable)
- ✅ **Click Tracking**: `clicks` field incremented on access

---

## 📌 Sample `.env`

```
PORT=5000
MONGO_URI=mongodb://localhost:27017/URL_SHORTENER
BASE_URL=https://short.ly
```

---

## 📄 License

MIT © [Rishi Sahu](https://github.com/Rishisahu19)

---

## 🙌 Acknowledgements

- [Express.js](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [nanoid](https://github.com/ai/nanoid)
- [valid-url](https://www.npmjs.com/package/valid-url)
- [express-rate-limit](https://www.npmjs.com/package/express-rate-limit)
