import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Instructor } from './Instructor';
import { Trainee } from './Trainee';

@Entity()
export class Pairing {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Instructor)
  instructor!: Instructor;

  @ManyToOne(() => Trainee)
  trainee!: Trainee;

  @Column()
  date!: Date;
} 