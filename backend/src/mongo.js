const { MongoClient } = require('mongodb');

const MONGO_HOST = process.env.MONGO_HOST;
const MONGO_PORT = process.env.MONGO_PORT;
const DB_NAME = process.env.MONGO_DB;

const uri = `mongodb://${MONGO_HOST}:${MONGO_PORT}`;
console.log("Connecting to MongoDB using URI:", uri);
let db;

async function connectToMongo() {
  const client = new MongoClient(uri);
  await client.connect();
  db = client.db(DB_NAME);
  console.log("✅ Connected to MongoDB");
}

function getDb() {
  if (!db) throw new Error("❌ Mongo not initialized");
  return db;
}

module.exports = { connectToMongo, getDb };
