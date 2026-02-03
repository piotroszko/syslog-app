import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from "typeorm"

export enum SyslogLevel {
    ERROR = 4,
    WARNING = 3,
    INFO = 2,
    DEBUG = 1,
}

@Entity()
export class Syslog {
    @PrimaryGeneratedColumn()
    id!: number

    @Column({
        type: "int",
    })
    level!: SyslogLevel

    @Column()
    content!: string

    @CreateDateColumn()
    createdAt!: Date
}
