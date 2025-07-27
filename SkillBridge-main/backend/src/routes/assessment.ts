import { Router } from 'express';
import { AppDataSource } from '../../ormconfig';
import { Assessment } from '../entity/Assessment';

const router = Router();
const repo = AppDataSource.getRepository(Assessment);

// List all assessments
router.get('/', async (req, res) => {
  const assessments = await repo.find({ relations: ['results'] });
  res.json(assessments);
});

// Get assessment by id
router.get('/:id', async (req, res) => {
  const assessment = await repo.findOne({ where: { id: Number(req.params.id) }, relations: ['results'] });
  if (!assessment) return res.status(404).json({ error: 'Not found' });
  res.json(assessment);
});

// Create assessment
router.post('/', async (req, res) => {
  const assessment = repo.create(req.body);
  await repo.save(assessment);
  res.status(201).json(assessment);
});

// Update assessment
router.put('/:id', async (req, res) => {
  const assessment = await repo.findOneBy({ id: Number(req.params.id) });
  if (!assessment) return res.status(404).json({ error: 'Not found' });
  repo.merge(assessment, req.body);
  await repo.save(assessment);
  res.json(assessment);
});

// Delete assessment
router.delete('/:id', async (req, res) => {
  const result = await repo.delete({ id: Number(req.params.id) });
  res.json({ affected: result.affected });
});

export default router; 