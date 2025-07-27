import express from 'express';
import cors from 'cors';
import 'reflect-metadata';
import { AppDataSource } from '../ormconfig';
import { Instructor } from './entity/Instructor';
import { Trainee } from './entity/Trainee';
import { Assessment } from './entity/Assessment';
import { AssessmentResult } from './entity/AssessmentResult';
import { Pairing } from './entity/Pairing';
import instructorRouter from './routes/instructor';
import traineeRouter from './routes/trainee';
import assessmentRouter from './routes/assessment';
import assessmentResultRouter from './routes/assessmentResult';
import pairingRouter from './routes/pairing';

const app = express();
app.use(cors());
app.use(express.json());

app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.use('/api/instructors', instructorRouter);
app.use('/api/trainees', traineeRouter);
app.use('/api/assessments', assessmentRouter);
app.use('/api/assessment-results', assessmentResultRouter);
app.use('/api/pairings', pairingRouter);

// TODO: Add API routes for CRUD and pairing logic

const PORT = process.env.PORT || 4000;

// Database connection with retry
const connectWithRetry = async () => {
  const maxRetries = 10;
  const retryDelay = 5000; // 5 seconds

  for (let i = 0; i < maxRetries; i++) {
    try {
      await AppDataSource.initialize();
      console.log('✅ Database connected successfully');
      
      app.listen(PORT, () => {
        console.log(`🚀 Backend server running on port ${PORT}`);
        console.log(`📋 Health check: http://localhost:${PORT}/health`);
      });
      
      return;
    } catch (error) {
      console.log(`❌ Database connection attempt ${i + 1}/${maxRetries} failed:`, (error as Error).message);
      
      if (i === maxRetries - 1) {
        console.error('💥 Max retries reached. Exiting...');
        process.exit(1);
      }
      
      console.log(`⏳ Retrying in ${retryDelay / 1000} seconds...`);
      await new Promise(resolve => setTimeout(resolve, retryDelay));
    }
  }
};

// Start the application
connectWithRetry().catch(error => {
  console.error('🔥 Failed to start application:', error);
  process.exit(1);
}); 