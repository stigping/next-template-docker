#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

const projectName = process.argv[2];
if (!projectName) {
  console.error("❌ Please provide a project name.");
  process.exit(1);
}

const baseDir = path.resolve(__dirname, "..");

// 🔥 Clean transient folders in the template
const cleanupDirs = [".next", "node_modules", "dist"];
cleanupDirs.forEach((dir) => {
  const fullPath = path.join(baseDir, dir);
  if (fs.existsSync(fullPath)) {
    fs.rmSync(fullPath, { recursive: true, force: true });
    console.log(`🧹 Removed stale ${dir} from template.`);
  }
});

const targetDir = path.resolve(baseDir, "..", projectName);
if (fs.existsSync(targetDir)) {
  console.error("❌ Project directory already exists:", targetDir);
  process.exit(1);
}

// 📁 Copy template folder to new project
fs.cpSync(baseDir, targetDir, {
  recursive: true,
  filter: (src) => !/node_modules|\.next|\.git/.test(src),
});

// 🔁 Randomize host ports (internal ports stay fixed)
const basePort = Math.floor(Math.random() * (3999 - 3000 + 1)) + 3000;
const portFrontend = basePort;
const portBackend = basePort + 1;
const portMongo = basePort + 2;

// 🌱 Update `.env`
const envExamplePath = path.join(targetDir, ".env.example");
const envPath = path.join(targetDir, ".env");
const envExample = fs.readFileSync(envExamplePath, "utf-8");

const updatedEnv = envExample
  .replace(/COMPOSE_PROJECT_NAME=.*/, `COMPOSE_PROJECT_NAME=${projectName}`)
  .replace(/NEXT_PUBLIC_PORT=.*/, `NEXT_PUBLIC_PORT=${portFrontend}`)
  .replace(/BACKEND_PORT=.*/, `BACKEND_PORT=${portBackend}`)
  .replace(/MONGO_PORT=.*/, `MONGO_PORT=${portMongo}`)
  .replace(/MONGO_DB=.*/, `MONGO_DB=${projectName}_db`)
  .replace(/MONGO_HOST=.*/, `MONGO_HOST=mongo_\${COMPOSE_PROJECT_NAME}`);

fs.writeFileSync(envPath, updatedEnv);

// 🧾 Update apps.json
const appsJsonPath = path.resolve(baseDir, "..", "apps.json");
let apps = [];

if (fs.existsSync(appsJsonPath)) {
  try {
    apps = JSON.parse(fs.readFileSync(appsJsonPath, "utf-8"));
  } catch (err) {
    console.error("⚠️ Could not parse apps.json:", err);
  }
}

apps.push({
  name: projectName,
  ports: {
    frontend: portFrontend,
    backend: portBackend,
    mongo: portMongo,
  },
  path: targetDir,
  createdAt: new Date().toISOString(),
});

fs.writeFileSync(appsJsonPath, JSON.stringify(apps, null, 2));

console.log(`✅ Project "${projectName}" bootstrapped with ports ${portFrontend}, ${portBackend}, ${portMongo}`);
