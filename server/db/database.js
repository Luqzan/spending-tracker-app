/* eslint-disable no-undef */
import Sequelize from "sequelize";
import env from "dotenv";
import logger from "../utils/logger.js";
import SequelizeStore from "connect-session-sequelize";
import session from "express-session";

env.config();

export const sequelize = new Sequelize({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  dialect: "mysql",
  logging: (msg) => logger.info(msg),
});

const SequelizeSessionStore = SequelizeStore(session.Store);
export const sessionStore = new SequelizeSessionStore({
  db: sequelize,
  tableName: "sessions",
});

export async function connectDatabase() {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    console.log("Connection to database has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database: ", error);
  }
}
