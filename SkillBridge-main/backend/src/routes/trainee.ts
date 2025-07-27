import { Router } from 'express';
import { AppDataSource } from '../../ormconfig';
import { Trainee } from '../entity/Trainee';
import { Instructor } from '../entity/Instructor';

const router = Router();
const repo = AppDataSource.getRepository(Trainee);
const instructorRepo = AppDataSource.getRepository(Instructor);

// List all trainees
router.get('/', async (req, res) => {
  const trainees = await repo.find({ relations: ['instructor'] });
  res.json(trainees);
});

// Get trainee by id
router.get('/:id', async (req, res) => {
  const trainee = await repo.findOne({ where: { id: Number(req.params.id) }, relations: ['instructor'] });
  if (!trainee) return res.status(404).json({ error: 'Not found' });
  res.json(trainee);
});

// Create trainee
router.post('/', async (req, res) => {
  const { name, email, instructorId } = req.body;
  const instructor = await instructorRepo.findOneBy({ id: instructorId });
  if (!instructor) return res.status(400).json({ error: 'Instructor not found' });
  const trainee = repo.create({ name, email, instructor });
  await repo.save(trainee);
  res.status(201).json(trainee);
});

// Update trainee
router.put('/:id', async (req, res) => {
  const trainee = await repo.findOneBy({ id: Number(req.params.id) });
  if (!trainee) return res.status(404).json({ error: 'Not found' });
  const { name, email, instructorId } = req.body;
  if (instructorId) {
    const instructor = await instructorRepo.findOneBy({ id: instructorId });
    if (!instructor) return res.status(400).json({ error: 'Instructor not found' });
    trainee.instructor = instructor;
  }
  if (name) trainee.name = name;
  if (email) trainee.email = email;
  await repo.save(trainee);
  res.json(trainee);
});

// Delete trainee
router.delete('/:id', async (req, res) => {
  const result = await repo.delete({ id: Number(req.params.id) });
  res.json({ affected: result.affected });
});

export default router; 