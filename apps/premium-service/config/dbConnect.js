import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

export const SequelizeConfig = new Sequelize({
  database: process.env.DB_NAME ?? "test_1",
  username: process.env.DB_USER ?? "postgres",
  password: process.env.DB_PASSWORD ?? "",
  host: process.env.DB_HOST,
  port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 5432,
  dialect: "postgres",
  logging: false,
  pool: {
    max: 50,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});

export const connectToDatabase = async () => {
  try {
    await SequelizeConfig.authenticate();
    console.log("Connection has been established successfully.");

    await import("../model/index.js");
    await SequelizeConfig.sync();
    console.log("Models synced");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};
