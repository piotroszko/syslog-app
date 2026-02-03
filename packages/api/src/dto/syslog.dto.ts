export interface SyslogDto {
    startDate?: string;
    endDate?: string;
    level?: string;
}

export interface Syslog {
    id: string;
    createdAt: Date;
    level: number;
    content: string;
}

export interface SyslogResponseDto {
    list: Syslog[];
    total: number;
}