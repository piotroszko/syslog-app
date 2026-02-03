import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository, Between, MoreThanOrEqual } from "typeorm";
import { Syslog } from "../db";
import { SyslogDto } from "@workspace/api";

@Injectable()
export class SyslogsService {
  constructor(
    @InjectRepository(Syslog)
    private syslogRepository: Repository<Syslog>,
  ) {}

  async findAll(query: SyslogDto) {
    const where: any = {};

    if (query.startDate && query.endDate) {
      where.createdAt = Between(new Date(query.startDate), new Date(query.endDate));
    }

    if (query.level) {
      const level = query.level;

      if (level !== undefined) {
        where.level = MoreThanOrEqual(level);
      }
    }

    return this.syslogRepository.find({
      where,
      order: { createdAt: "DESC" },
    });
  }
}
