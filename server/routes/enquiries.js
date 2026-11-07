import { Router } from 'express';
import Enquiry from '../models/Enquiry.js';
import { requireAdmin } from '../middleware/auth.js';

const router = Router();

router.post('/', async (req, res, next) => {
  try {
    const enquiry = await Enquiry.create(req.body);
    res.status(201).json({ message: 'Enquiry received.', enquiry });
  } catch (error) {
    error.status = 400;
    next(error);
  }
});

router.get('/', requireAdmin, async (_req, res, next) => {
  try {
    res.json(await Enquiry.find().sort({ createdAt: -1 }));
  } catch (error) {
    next(error);
  }
});

router.patch('/:id/status', requireAdmin, async (req, res, next) => {
  try {
    const enquiry = await Enquiry.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true, runValidators: true });
    if (!enquiry) return res.status(404).json({ message: 'Enquiry not found.' });
    res.json(enquiry);
  } catch (error) {
    next(error);
  }
});

export default router;
