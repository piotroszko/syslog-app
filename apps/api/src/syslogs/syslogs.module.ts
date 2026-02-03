
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Syslog } from '../db';
import { SyslogsService } from './syslogs.service';
import { SyslogsController } from './syslogs.controller';

@Module({
    imports: [TypeOrmModule.forFeature([Syslog])],
    controllers: [SyslogsController],
    providers: [SyslogsService],
})
export class SyslogsModule { }
