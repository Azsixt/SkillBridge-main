import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Trainee } from './Trainee';

@Entity()
export class Instructor {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'varchar', length: 255 })
  name!: string;

  @Column({ type: 'varchar', length: 255, unique: true })
  email!: string;

  @Column({ type: 'simple-array' })
  specialties!: string[];

  @Column({ type: 'boolean', default: true })
  available!: boolean;

  @OneToMany(() => Trainee, (trainee) => trainee.instructor)
  trainees!: Trainee[];
} 