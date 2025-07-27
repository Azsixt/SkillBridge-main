import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Trainee } from './Trainee';
import { Assessment } from './Assessment';

@Entity()
export class AssessmentResult {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column('float')
  score!: number;

  @Column()
  date!: Date;

  @ManyToOne(() => Trainee)
  trainee!: Trainee;

  @ManyToOne(() => Assessment, assessment => assessment.results)
  assessment!: Assessment;
} 