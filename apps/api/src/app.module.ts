import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getDataSourceOptions } from './db';
import { SyslogsModule } from './syslogs/syslogs.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import path from 'path';


@Module({
  imports: [
    TypeOrmModule.forRoot(
      getDataSourceOptions(path.resolve(__dirname, '../syslog.sqlite'))
    ),
    SyslogsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
