// src/data/store.js
// In-memory data store (acts as a mock database)

const crops = [
  {
    id: "1",
    name: "Wheat",
    field: "Field A",
    stage: "Flowering",
    health: 92,
    soilMoisture: 72,
    temperature: 28,
    lastWatered: "2026-06-27T08:00:00Z",
    notes: "Growing well, no issues detected.",
  },
  {
    id: "2",
    name: "Rice",
    field: "Field B",
    stage: "Seedling",
    health: 78,
    soilMoisture: 60,
    temperature: 30,
    lastWatered: "2026-06-27T05:00:00Z",
    notes: "Moisture levels slightly low. Monitor closely.",
  },
  {
    id: "3",
    name: "Corn",
    field: "Field C",
    stage: "Harvesting",
    health: 95,
    soilMoisture: 80,
    temperature: 26,
    lastWatered: "2026-06-27T09:00:00Z",
    notes: "Ready for harvest in 3-5 days.",
  },
  {
    id: "4",
    name: "Tomatoes",
    field: "Greenhouse",
    stage: "Fruiting",
    health: 85,
    soilMoisture: 75,
    temperature: 25,
    lastWatered: "2026-06-27T07:00:00Z",
    notes: "Fruiting stage. Increase potassium supply.",
  },
];

const alerts = [
  {
    id: "1",
    cropId: "2",
    type: "warning",
    message: "Soil moisture below optimal level in Field B.",
    resolved: false,
    createdAt: "2026-06-27T10:00:00Z",
  },
  {
    id: "2",
    cropId: "1",
    type: "info",
    message: "Wheat flowering stage detected. AI recommends reducing irrigation.",
    resolved: false,
    createdAt: "2026-06-27T09:30:00Z",
  },
];

module.exports = { crops, alerts };
