
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between, MoreThanOrEqual } from 'typeorm';
import { Syslog, SyslogLevel } from '../db';
import { SyslogDto } from '@workspace/api';

@Injectable()
export class SyslogsService {
    constructor(
        @InjectRepository(Syslog)
        private syslogRepository: Repository<Syslog>,
    ) { }

    async findAll(query: SyslogDto) {
        const where: any = {};

        if (query.startDate && query.endDate) {
            where.createdAt = Between(new Date(query.startDate), new Date(query.endDate));
        }

        if (query.level) {
            let levelValue: number | undefined;
            const levelKey = query.level.toUpperCase() as keyof typeof SyslogLevel;

            if (SyslogLevel[levelKey] !== undefined) {
                levelValue = SyslogLevel[levelKey];
            } else if (!isNaN(Number(query.level))) {
                levelValue = Number(query.level);
            }

            if (levelValue !== undefined) {
                where.level = MoreThanOrEqual(levelValue);
            }
        }

        return this.syslogRepository.find({
            where,
            order: { createdAt: 'DESC' },
        });
    }
}
