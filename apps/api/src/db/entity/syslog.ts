import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from "typeorm";
import { SyslogLevel } from "@workspace/api";

@Entity()
export class Syslog {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({
    type: "int",
  })
  level!: SyslogLevel;

  @Column()
  content!: string;

  @CreateDateColumn()
  createdAt!: Date;
}
