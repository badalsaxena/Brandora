import mongoose from 'mongoose';

const enquirySchema = new mongoose.Schema({
  fullName: { type: String, required: true, trim: true },
  businessName: { type: String, required: true, trim: true },
  phone: { type: String, required: true, trim: true },
  package: { type: String, required: true, trim: true },
  location: { type: String, required: true, trim: true },
  requirements: { type: String, required: true, trim: true },
  status: { type: String, enum: ['new', 'contacted', 'closed'], default: 'new' }
}, { timestamps: true });

export default mongoose.model('Enquiry', enquirySchema);
