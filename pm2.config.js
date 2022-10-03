require('dotenv').config();

module.exports = {
  apps : [{
    name: process.env.PROJECT_NAME,
    script: "dist/app.js",
    env: {
      "NODE_ENV": "production",
    },
    instances: "max",
    exec_mode: "cluster"
  }]
}