import { Router } from 'express';
import { AppDataSource } from '../../ormconfig';
import { AssessmentResult } from '../entity/AssessmentResult';
import { Trainee } from '../entity/Trainee';
import { Assessment } from '../entity/Assessment';

const router = Router();
const repo = AppDataSource.getRepository(AssessmentResult);
const traineeRepo = AppDataSource.getRepository(Trainee);
const assessmentRepo = AppDataSource.getRepository(Assessment);

// List all assessment results
router.get('/', async (req, res) => {
  const results = await repo.find({ relations: ['trainee', 'assessment'] });
  res.json(results);
});

// Get assessment result by id
router.get('/:id', async (req, res) => {
  const result = await repo.findOne({ where: { id: Number(req.params.id) }, relations: ['trainee', 'assessment'] });
  if (!result) return res.status(404).json({ error: 'Not found' });
  res.json(result);
});

// Create assessment result
router.post('/', async (req, res) => {
  const { score, date, traineeId, assessmentId } = req.body;
  const trainee = await traineeRepo.findOneBy({ id: traineeId });
  const assessment = await assessmentRepo.findOneBy({ id: assessmentId });
  if (!trainee || !assessment) return res.status(400).json({ error: 'Trainee or Assessment not found' });
  const result = repo.create({ score, date, trainee, assessment });
  await repo.save(result);
  res.status(201).json(result);
});

// Update assessment result
router.put('/:id', async (req, res) => {
  const result = await repo.findOneBy({ id: Number(req.params.id) });
  if (!result) return res.status(404).json({ error: 'Not found' });
  const { score, date, traineeId, assessmentId } = req.body;
  if (traineeId) {
    const trainee = await traineeRepo.findOneBy({ id: traineeId });
    if (!trainee) return res.status(400).json({ error: 'Trainee not found' });
    result.trainee = trainee;
  }
  if (assessmentId) {
    const assessment = await assessmentRepo.findOneBy({ id: assessmentId });
    if (!assessment) return res.status(400).json({ error: 'Assessment not found' });
    result.assessment = assessment;
  }
  if (score !== undefined) result.score = score;
  if (date) result.date = date;
  await repo.save(result);
  res.json(result);
});

// Delete assessment result
router.delete('/:id', async (req, res) => {
  const result = await repo.delete({ id: Number(req.params.id) });
  res.json({ affected: result.affected });
});

export default router; 