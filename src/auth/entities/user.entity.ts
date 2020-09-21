import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn, Unique } from "typeorm";
import * as bcrypt from 'bcrypt'
import { TaskEntity } from "src/tasks/entities/task.entity";

@Entity()
@Unique(['username'])
export class UserEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  username: string

  @Column()
  password: string

  @Column()
  salt: string

  @OneToMany(type => TaskEntity, task => task.user, { eager: true })
  tasks: Array<TaskEntity>

  async validatePassword(password: string): Promise<boolean> {
    const isValid = await bcrypt.compare(password, this.password)
    return isValid
  }
}
