import { Exclude } from "class-transformer"
import {
  Column,
  Entity,
  CreateDateColumn,
  OneToMany,
  PrimaryGeneratedColumn,
  JoinTable,
} from "typeorm"
import { Contact } from "./contact.entity"

@Entity("users")
export class User {
  @PrimaryGeneratedColumn("uuid")
  readonly id: string

  @Column({ length: 256 })
  name: string

  @Column({ length: 256, unique: true })
  email: string

  @Column()
  @Exclude()
  password: string

  @Column({ length: 11 })
  number: string

  @CreateDateColumn()
  createdAt: Date

  @OneToMany((type) => Contact, (contacts) => contacts.user, {
    eager: true,
  })
  @JoinTable()
  contacts: Contact[]
}
