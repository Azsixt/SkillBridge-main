import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { AssessmentResult } from './AssessmentResult';

@Entity()
export class Assessment {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  title!: string;

  @Column('text')
  description!: string;

  @OneToMany(() => AssessmentResult, result => result.assessment)
  results!: AssessmentResult[];
} 