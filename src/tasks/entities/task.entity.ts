import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { TaskStatus } from "../protocols/tasks.protocols";

@Entity()
export class TaskEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  title:string

  @Column()
  description: string

  @Column()
  status: TaskStatus
}
