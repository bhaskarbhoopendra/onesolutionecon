import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Admin {
  @PrimaryGeneratedColumn()
  public id: string;

  @Column()
  public email: string;

  @Column()
  public password: string;
}
