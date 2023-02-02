import { Exclude } from "class-transformer"
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm"
import { User } from "./user.entity"

@Entity("contacts")
export class Contact {
  @PrimaryGeneratedColumn("uuid")
  readonly id: string

  @Column({ length: 256 })
  name: string

  @Column({ length: 256, unique: true })
  email: string

  @Column({ length: 11, unique: true })
  number: string

  @CreateDateColumn()
  createdAt: Date

  @Exclude()
  @ManyToOne((type) => User, (users) => users.contacts, {
    eager: true,
    onDelete: "CASCADE",
  })
  user: User
}
