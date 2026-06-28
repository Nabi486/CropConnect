# 🌱 Smart Farm Hub

An AI-powered farm management platform built during the **TBI-GEU Internship Program**.

---

## 📁 Project Structure

```
Smart Farm Hub W2/
├── frontend/        ← Next.js app (Week 2 & 3)
└── backend/         ← Express REST API (Week 4)
```

---

## 🚀 How to Run Frontend Locally

```bash
cd frontend
npm install
npm run dev
```
Open [http://localhost:3000](http://localhost:3000)

---

## 🖥️ How to Run Backend Locally

### 1. Go to the backend folder
```bash
cd backend
```

### 2. Install dependencies
```bash
npm install
```

### 3. Set up environment variables
```bash
cp .env.example .env
```
Edit `.env` with your values (defaults work fine for local dev).

### 4. Start the server
```bash
# Development (auto-restart on file changes)
npm run dev

# Production
npm start
```

Server runs on **http://localhost:5000**

---

## 📡 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/crops` | Get all crops |
| GET | `/api/crops/:id` | Get single crop |
| POST | `/api/crops` | Create new crop |
| PUT | `/api/crops/:id` | Update crop (full) |
| PATCH | `/api/crops/:id` | Update crop (partial) |
| DELETE | `/api/crops/:id` | Delete crop |
| GET | `/api/crops/search?q=wheat` | Search crops |
| GET | `/api/alerts` | Get all alerts |
| POST | `/api/alerts` | Create alert |
| PATCH | `/api/alerts/:id/resolve` | Resolve alert |
| DELETE | `/api/alerts/:id` | Delete alert |

### Example Request — Create Crop
```bash
curl -X POST http://localhost:5000/api/crops \
  -H "Content-Type: application/json" \
  -d '{"name":"Barley","field":"Field D","stage":"Seedling"}'
```

### Example Response
```json
{
  "success": true,
  "data": {
    "id": "abc-123",
    "name": "Barley",
    "field": "Field D",
    "stage": "Seedling",
    "health": 100,
    "soilMoisture": 70,
    "temperature": 25,
    "lastWatered": "2026-06-28T10:00:00Z",
    "notes": ""
  }
}
```

---

## 🛠️ Tech Stack

**Frontend:** Next.js 15, Tailwind CSS, TypeScript  
**Backend:** Node.js, Express.js  
**AI:** Anthropic Claude API  
**Tools:** Postman, Git, Figma
