import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppDataSource } from '@workspace/db';
import { SyslogsModule } from './syslogs/syslogs.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    TypeOrmModule.forRoot(AppDataSource.options),
    SyslogsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
