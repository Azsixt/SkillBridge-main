import { DataSource } from 'typeorm';
import { Instructor } from './src/entity/Instructor';
import { Trainee } from './src/entity/Trainee';
import { Assessment } from './src/entity/Assessment';
import { AssessmentResult } from './src/entity/AssessmentResult';
import { Pairing } from './src/entity/Pairing';

export const AppDataSource = new DataSource({
  type: 'postgres',
  url: process.env.DATABASE_URL,
  synchronize: true, // For dev only; use migrations in prod
  logging: false,
  entities: [Instructor, Trainee, Assessment, AssessmentResult, Pairing],
}); 