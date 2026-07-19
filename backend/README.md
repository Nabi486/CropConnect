# 🌱 Smart Farm Hub — Backend API

REST API for Smart Farm Hub built with **Node.js**, **Express**, and **MongoDB Atlas**.

---

## 📁 Project Structure

```
backend/
├── src/
│   ├── index.js              ← Express server entry point
│   ├── config/
│   │   └── db.js             ← MongoDB connection
│   ├── models/
│   │   ├── Crop.js           ← Crop schema (Mongoose)
│   │   └── Alert.js          ← Alert schema (Mongoose)
│   ├── controllers/
│   │   ├── cropsController.js
│   │   └── alertsController.js
│   ├── routes/
│   │   ├── crops.js
│   │   └── alerts.js
│   ├── middleware/
│   │   ├── errorHandler.js
│   │   └── asyncHandler.js
│   └── seed.js               ← Seed script for initial data
├── .env.example
├── .gitignore
└── README.md
```

---

## 🗄️ Database Choice

**MongoDB Atlas** (cloud-hosted NoSQL database)

**Why MongoDB?**
- Schema-less/flexible — easy to add new sensor fields without migrations
- JSON-like documents match the API response format exactly
- Free tier (M0) is sufficient for this project
- Mongoose ODM provides schema validation and clean query syntax
- Works great with Node.js/Express ecosystem

---

## 📊 Schema Diagram

![Schema Diagram](./W5_SchemaDiagram_SFH001.png)

### Crop Collection
| Field | Type | Notes |
|-------|------|-------|
| _id | ObjectId | Primary Key (auto) |
| name | String | Required |
| field | String | Required |
| stage | String | Enum: Seedling, Vegetative, Flowering, Fruiting, Ripening, Harvesting |
| health | Number | 0–100, default 100 |
| soilMoisture | Number | 0–100, default 70 |
| temperature | Number | default 25 |
| lastWatered | Date | default now |
| notes | String | optional |
| createdAt | Date | auto (Mongoose timestamps) |
| updatedAt | Date | auto (Mongoose timestamps) |

### Alert Collection
| Field | Type | Notes |
|-------|------|-------|
| _id | ObjectId | Primary Key (auto) |
| cropId | ObjectId | Foreign Key → Crop |
| type | String | Enum: info, warning, error |
| message | String | Required |
| resolved | Boolean | default false |
| createdAt | Date | auto |
| updatedAt | Date | auto |

**Relationship:** One Crop → Many Alerts

---

## 🚀 How to Run Backend Locally

### Step 1 — Clone and install
```bash
git clone https://github.com/Nabi486/CropConnect.git
cd CropConnect/backend
npm install
```

### Step 2 — Set up environment variables
```bash
cp .env.example .env
```

Edit `.env` and add your MongoDB connection string:
```
MONGO_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/smartfarmhub
PORT=5000
FRONTEND_URL=http://localhost:3000
```

### Step 3 — Set up the database

**Get a free MongoDB Atlas cluster:**
1. Go to [mongodb.com/atlas](https://www.mongodb.com/atlas)
2. Sign up free → Create a free M0 cluster
3. Database Access → Add a user with username + password
4. Network Access → Add IP `0.0.0.0/0` (allow all)
5. Connect → Drivers → copy the connection string
6. Paste it into your `.env` as `MONGO_URI`

**Seed initial data:**
```bash
node src/seed.js
```

### Step 4 — Start the server
```bash
# Development (auto-restart)
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
| GET | `/api/crops/search?q=wheat` | Search crops |
| GET | `/api/crops/:id` | Get single crop |
| POST | `/api/crops` | Create crop |
| PUT | `/api/crops/:id` | Full update |
| PATCH | `/api/crops/:id` | Partial update |
| DELETE | `/api/crops/:id` | Delete crop |
| GET | `/api/alerts` | Get all alerts |
| POST | `/api/alerts` | Create alert |
| PATCH | `/api/alerts/:id/resolve` | Resolve alert |
| DELETE | `/api/alerts/:id` | Delete alert |

---

## 🛠️ Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB Atlas
- **ODM:** Mongoose
- **Tools:** Postman, Git, dotenv
