import { Router } from 'express';
import { AppDataSource } from '../../ormconfig';
import { Pairing } from '../entity/Pairing';
import { Instructor } from '../entity/Instructor';
import { Trainee } from '../entity/Trainee';
import { AssessmentResult } from '../entity/AssessmentResult';
import { Assessment } from '../entity/Assessment';

const router = Router();
const repo = AppDataSource.getRepository(Pairing);
const instructorRepo = AppDataSource.getRepository(Instructor);
const traineeRepo = AppDataSource.getRepository(Trainee);

// List all pairings
router.get('/', async (req, res) => {
  const pairings = await repo.find({ relations: ['instructor', 'trainee'] });
  res.json(pairings);
});

// Get pairing by id
router.get('/:id', async (req, res) => {
  const pairing = await repo.findOne({ where: { id: Number(req.params.id) }, relations: ['instructor', 'trainee'] });
  if (!pairing) return res.status(404).json({ error: 'Not found' });
  res.json(pairing);
});

// Create pairing
router.post('/', async (req, res) => {
  const { instructorId, traineeId, date } = req.body;
  const instructor = await instructorRepo.findOneBy({ id: instructorId });
  const trainee = await traineeRepo.findOneBy({ id: traineeId });
  if (!instructor || !trainee) return res.status(400).json({ error: 'Instructor or Trainee not found' });
  const pairing = repo.create({ instructor, trainee, date });
  await repo.save(pairing);
  res.status(201).json(pairing);
});

// Update pairing
router.put('/:id', async (req, res) => {
  const pairing = await repo.findOneBy({ id: Number(req.params.id) });
  if (!pairing) return res.status(404).json({ error: 'Not found' });
  const { instructorId, traineeId, date } = req.body;
  if (instructorId) {
    const instructor = await instructorRepo.findOneBy({ id: instructorId });
    if (!instructor) return res.status(400).json({ error: 'Instructor not found' });
    pairing.instructor = instructor;
  }
  if (traineeId) {
    const trainee = await traineeRepo.findOneBy({ id: traineeId });
    if (!trainee) return res.status(400).json({ error: 'Trainee not found' });
    pairing.trainee = trainee;
  }
  if (date) pairing.date = date;
  await repo.save(pairing);
  res.json(pairing);
});

// Delete pairing
router.delete('/:id', async (req, res) => {
  const result = await repo.delete({ id: Number(req.params.id) });
  res.json({ affected: result.affected });
});

// Intelligent pairing endpoint (specialty and availability aware)
router.post('/intelligent', async (req, res) => {
  // Fetch all instructors, trainees, assessments, and results
  const instructors = await instructorRepo.find({ relations: ['trainees'] });
  const trainees = await traineeRepo.find();
  const pairings = await repo.find({ relations: ['instructor', 'trainee'] });
  const results = await AppDataSource.getRepository(AssessmentResult).find({ relations: ['trainee', 'assessment'] });
  const assessments = await AppDataSource.getRepository(Assessment).find();

  // Helper: Get last pairing date for instructor/trainee
  const lastPairingMap: Record<string, Date> = {};
  pairings.forEach(p => {
    const key = `${p.instructor.id}_${p.trainee.id}`;
    if (!lastPairingMap[key] || p.date > lastPairingMap[key]) {
      lastPairingMap[key] = p.date;
    }
  });

  // Helper: Instructor load
  const instructorLoad: Record<number, number> = {};
  instructors.forEach(i => { instructorLoad[i.id] = 0; });
  pairings.forEach(p => { instructorLoad[p.instructor.id] = (instructorLoad[p.instructor.id] || 0) + 1; });

  // For each trainee, find weakest assessment area
  const traineeWeakest: Record<number, { assessmentId: number, score: number, title: string } | null> = {};
  trainees.forEach(trainee => {
    const tResults = results.filter(r => r.trainee.id === trainee.id);
    if (tResults.length === 0) {
      traineeWeakest[trainee.id] = null;
      return;
    }
    let minScore = Infinity;
    let minAssessmentId = -1;
    let minTitle = '';
    tResults.forEach(r => {
      if (r.score < minScore) {
        minScore = r.score;
        minAssessmentId = r.assessment.id;
        minTitle = r.assessment.title;
      }
    });
    traineeWeakest[trainee.id] = { assessmentId: minAssessmentId, score: minScore, title: minTitle };
  });

  // Pairing logic
  const suggestedPairings = trainees.map(trainee => {
    const weakest = traineeWeakest[trainee.id];
    // Only consider available instructors with matching specialty and not recently paired
    const availableInstructors = instructors.filter(instr => {
      if (!instr.available) return false;
      if (!weakest || !instr.specialties.includes(weakest.title)) return false;
      const key = `${instr.id}_${trainee.id}`;
      // Not paired in last 7 days (or never)
      return !lastPairingMap[key] || (new Date().getTime() - new Date(lastPairingMap[key]).getTime() > 7 * 24 * 60 * 60 * 1000);
    });
    if (availableInstructors.length === 0) {
      return {
        instructorId: null,
        instructorName: null,
        traineeId: trainee.id,
        traineeName: trainee.name,
        rationale: 'No available instructor with matching specialty.',
      };
    }
    // Pick instructor with lowest load
    let chosenInstructor = availableInstructors[0];
    availableInstructors.forEach(instr => {
      if (instructorLoad[instr.id] < instructorLoad[chosenInstructor.id]) {
        chosenInstructor = instr;
      }
    });
    // Rationale
    let rationale = '';
    if (weakest) {
      rationale = `Trainee's weakest area: ${weakest.title} (score: ${weakest.score}). Instructor specialty matches.`;
    } else {
      rationale = 'No assessment data available.';
    }
    return {
      instructorId: chosenInstructor.id,
      instructorName: chosenInstructor.name,
      traineeId: trainee.id,
      traineeName: trainee.name,
      rationale,
    };
  });

  res.json({ suggestedPairings });
});

export default router; 