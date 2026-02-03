import { Controller, Get, Query } from "@nestjs/common";
import { SyslogsService } from "./syslogs.service";
import { SyslogLevel } from "@workspace/api";

@Controller("syslogs")
export class SyslogsController {
  constructor(private readonly syslogsService: SyslogsService) {}

  @Get()
  findAll(
    @Query("startDate") startDate?: string,
    @Query("endDate") endDate?: string,
    @Query("level") level?: SyslogLevel,
  ) {
    return this.syslogsService.findAll({ startDate, endDate, level });
  }
}
