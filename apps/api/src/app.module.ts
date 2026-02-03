import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { getDataSourceOptions } from "./db";
import { SyslogsModule } from "./syslogs/syslogs.module";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import path from "path";

const defaultDbPath = path.resolve(__dirname, "../syslog.sqlite");
const dbPath = process.env.DB_PATH || defaultDbPath;

@Module({
  imports: [TypeOrmModule.forRoot(getDataSourceOptions(dbPath)), SyslogsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
