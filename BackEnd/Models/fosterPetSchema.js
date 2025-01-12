
import mongoose from 'mongoose';

const fosterPetSchema = new mongoose.Schema({
  name: { type: String, required: true },
  breed: { type: String, required: true },
  age: { type: Number, required: true },
  medicalHistory: { type: String, required: true },
  status: { type: String, enum: ['Pending', 'Approved', 'In Foster Care', 'Requested', 'Returned'], default: 'Pending' },
  notes: { type: String },
  fosterParent: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  shelter: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export default mongoose.model('FosterPet', fosterPetSchema);
