import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"
import { BaseEntity } from "typeorm/repository/BaseEntity"
import { IsString, MinLength } from "class-validator"

@Entity()
export default class Game extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @IsString()
  @MinLength(1, {
    message: "Provide more than one character"
  })
  @Column("text", { nullable: false })
  name: string

  @Column("text", { nullable: false })
  color: string

  @Column("simple-json", { nullable: false })
  board: JSON
}
