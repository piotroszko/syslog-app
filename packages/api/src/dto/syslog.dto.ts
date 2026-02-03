export interface SyslogDto {
  startDate?: string;
  endDate?: string;
  level?: SyslogLevel;
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

export enum SyslogLevel {
  ERROR = 4,
  WARNING = 3,
  INFO = 2,
  DEBUG = 1,
}
