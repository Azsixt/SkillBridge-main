import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Instructor } from './Instructor';

@Entity()
export class Trainee {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column({ unique: true })
  email!: string;

  @Column({ default: 'active' })
  status!: string;

  @ManyToOne(() => Instructor, instructor => instructor.trainees)
  instructor!: Instructor;
} 