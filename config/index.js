require("dotenv").config();

module.exports = {
  CLUSTER_URL: process.env.APP_CLUSTER_URL,
  DB_NAME: process.env.APP_DB_NAME,
  DB_USERNAME: process.env.APP_DB_USERNAME,
  DB_PASSWORD: process.env.APP_DB_PASSWORD,
  PORT: process.env.APP_PORT,
  SECRET: process.env.APP_SECRET
};