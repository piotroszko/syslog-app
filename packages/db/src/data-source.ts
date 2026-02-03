import "reflect-metadata"
import { DataSource } from "typeorm"
import { Syslog } from "./entity/syslog.js"
import path from "path"

export const AppDataSource = new DataSource({
    type: "sqlite",
    database: path.resolve(__dirname, "../../syslog.sqlite"),
    synchronize: true,
    logging: false,
    entities: [Syslog],
    migrations: [],
    subscribers: [],
})

export * from "./entity/syslog"
