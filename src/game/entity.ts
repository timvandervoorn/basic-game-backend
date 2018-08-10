import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"
import { BaseEntity } from "typeorm/repository/BaseEntity"
import { IsString, IsArray, MinLength } from "class-validator"

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

  @IsString()
  @Column("text", { nullable: false })
  color: string

  @IsArray()
  @Column("json", { nullable: false })
  board: string[][]
}
