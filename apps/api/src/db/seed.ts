import { AppDataSource } from "./data-source";
import { Syslog, SyslogLevel } from "./entity/syslog";

async function seed() {
    try {
        await AppDataSource.initialize();
        const syslogRepository = AppDataSource.getRepository(Syslog);
        await syslogRepository.clear();

        const syslogs = [
            { level: SyslogLevel.INFO, content: "System started successfully.", },
            { level: SyslogLevel.WARNING, content: "Memory usage high." },
            { level: SyslogLevel.ERROR, content: "Database connection failed." },
            { level: SyslogLevel.DEBUG, content: "Debugging user login flow." },
            { level: SyslogLevel.INFO, content: "User logged in: admin" },
            { level: SyslogLevel.ERROR, content: "Payment gateway timeout." },
            { level: SyslogLevel.WARNING, content: "Disk space running low." },
            { level: SyslogLevel.INFO, content: "Scheduled maintenance completed." },
            { level: SyslogLevel.DEBUG, content: "Cache invalidated." },
            { level: SyslogLevel.ERROR, content: "API rate limit exceeded." },
        ];

        for (const log of syslogs) {
            const syslog = new Syslog();
            syslog.level = log.level;
            syslog.content = log.content;
            await syslogRepository.save(syslog);
        }

    } catch (err) {
        process.exit(1);
    } finally {
        if (AppDataSource.isInitialized) {
            await AppDataSource.destroy();
        }
    }
}

seed();
