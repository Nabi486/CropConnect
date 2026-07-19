// src/seed.js — run with: node src/seed.js
require("dotenv").config();
const mongoose = require("mongoose");
const Crop = require("./models/Crop");
const Alert = require("./models/Alert");

const crops = [
  {
    name: "Wheat",
    field: "Field A",
    stage: "Flowering",
    health: 92,
    soilMoisture: 72,
    temperature: 28,
    notes: "Growing well, no issues detected.",
  },
  {
    name: "Rice",
    field: "Field B",
    stage: "Seedling",
    health: 78,
    soilMoisture: 60,
    temperature: 30,
    notes: "Moisture levels slightly low. Monitor closely.",
  },
  {
    name: "Corn",
    field: "Field C",
    stage: "Harvesting",
    health: 95,
    soilMoisture: 80,
    temperature: 26,
    notes: "Ready for harvest in 3-5 days.",
  },
  {
    name: "Tomatoes",
    field: "Greenhouse",
    stage: "Fruiting",
    health: 85,
    soilMoisture: 75,
    temperature: 25,
    notes: "Fruiting stage. Increase potassium supply.",
  },
];

const seedDB = async () => {
  await mongoose.connect(process.env.MONGO_URI);
  console.log("MongoDB connected for seeding...");

  await Crop.deleteMany();
  await Alert.deleteMany();

  const insertedCrops = await Crop.insertMany(crops);
  console.log(`✅ ${insertedCrops.length} crops inserted`);

  const alerts = [
    {
      cropId: insertedCrops[1]._id,
      type: "warning",
      message: "Soil moisture below optimal level in Field B.",
    },
    {
      cropId: insertedCrops[0]._id,
      type: "info",
      message: "Wheat flowering stage detected. AI recommends reducing irrigation.",
    },
  ];

  await Alert.insertMany(alerts);
  console.log(`✅ ${alerts.length} alerts inserted`);
  console.log("🌱 Database seeded successfully!");

  process.exit(0);
};

seedDB().catch((err) => {
  console.error(err);
  process.exit(1);
});
