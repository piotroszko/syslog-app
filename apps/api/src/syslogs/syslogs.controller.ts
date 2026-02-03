
import { Controller, Get, Query } from '@nestjs/common';
import { SyslogsService } from './syslogs.service';

@Controller('syslogs')
export class SyslogsController {
    constructor(private readonly syslogsService: SyslogsService) { }

    @Get()
    findAll(
        @Query('startDate') startDate?: string,
        @Query('endDate') endDate?: string,
        @Query('level') level?: string,
    ) {
        return this.syslogsService.findAll({ startDate, endDate, level });
    }
}
