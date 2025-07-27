import { Router } from 'express';
import { AppDataSource } from '../../ormconfig';
import { Instructor } from '../entity/Instructor';

const router = Router();
const repo = AppDataSource.getRepository(Instructor);

// List all instructors
router.get('/', async (req, res) => {
  const instructors = await repo.find({ relations: ['trainees'] });
  res.json(instructors);
});

// Get instructor by id
router.get('/:id', async (req, res) => {
  const instructor = await repo.findOne({ where: { id: Number(req.params.id) }, relations: ['trainees'] });
  if (!instructor) return res.status(404).json({ error: 'Not found' });
  res.json(instructor);
});

// Create instructor
router.post('/', async (req, res) => {
  const { name, email, specialties, available } = req.body;
  const instructor = repo.create({ name, email, specialties, available });
  await repo.save(instructor);
  res.status(201).json(instructor);
});

// Update instructor
router.put('/:id', async (req, res) => {
  const instructor = await repo.findOneBy({ id: Number(req.params.id) });
  if (!instructor) return res.status(404).json({ error: 'Not found' });
  const { name, email, specialties, available } = req.body;
  if (name) instructor.name = name;
  if (email) instructor.email = email;
  if (specialties) instructor.specialties = specialties;
  if (available !== undefined) instructor.available = available;
  await repo.save(instructor);
  res.json(instructor);
});

// Delete instructor
router.delete('/:id', async (req, res) => {
  const result = await repo.delete({ id: Number(req.params.id) });
  res.json({ affected: result.affected });
});

export default router; 