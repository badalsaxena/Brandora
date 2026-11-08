import { Router } from 'express';
import Enquiry from '../models/Enquiry.js';
import { requireAdmin } from '../middleware/auth.js';
import { sendEnquiryEmail } from '../services/email.js';

const router = Router();

router.post('/', async (req, res, next) => {
  try {
    console.log('[enquiries] API request received');
    if (Enquiry.db.readyState !== 1) {
      console.error('[enquiries] MongoDB is not connected');
      return res.status(503).json({ message: 'MongoDB is not connected. Check MONGODB_URI and restart the API.' });
    }
    const enquiry = await Enquiry.create(req.body);
    console.log(`[enquiries] MongoDB enquiry saved: ${enquiry._id}`);
    try {
      console.log(`[enquiries] Email notification function called for enquiry ${enquiry._id}`);
      await sendEnquiryEmail(enquiry);
    } catch (emailError) {
      console.error(`[enquiries] Email notification failed for ${enquiry._id}: ${emailError.message}`);
      return res.status(201).json({
        message: 'Enquiry received, but the email notification could not be sent.',
        notificationSent: false,
        enquiry
      });
    }
    res.status(201).json({ message: 'Enquiry received.', notificationSent: true, enquiry });
  } catch (error) {
    if (error?.name === 'MongooseError' && error.message.includes('buffering timed out')) {
      error.status = 503;
      error.message = 'MongoDB is not connected. Check your MongoDB Atlas connection string and Network Access settings.';
    }
    if (!error.status) error.status = 400;
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
