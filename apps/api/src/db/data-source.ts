import "reflect-metadata";
import { DataSource } from "typeorm";
import { Syslog } from "./entity/syslog";
import path from "path";
import { TypeOrmModuleOptions } from "@nestjs/typeorm";

const defaultDbPath = path.resolve(__dirname, "../../syslog.sqlite");
const dbPath = process.env.DB_PATH || defaultDbPath;

export const AppDataSource = new DataSource({
  type: "sqlite",
  database: dbPath,
  synchronize: true,
  logging: false,
  entities: [Syslog],
  migrations: [],
  subscribers: [],
});

export const getDataSourceOptions = (dbPath: string): TypeOrmModuleOptions => {
  return {
    type: "sqlite",
    database: dbPath,
    synchronize: true,
    logging: false,
    entities: [Syslog],
    migrations: [],
    subscribers: [],
  };
};
