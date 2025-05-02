const { MongoClient } = require('mongodb');

const MONGO_HOST = process.env.MONGO_HOST || 'mongo_template';
const MONGO_PORT = process.env.MONGO_PORT || '27017';
const DB_NAME = process.env.MONGO_DB || 'appdb';

const uri = `mongodb://${MONGO_HOST}:${MONGO_PORT}`;
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
