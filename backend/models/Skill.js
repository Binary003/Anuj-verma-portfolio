import mongoose from 'mongoose';

const skillSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Skill name is required'],
    trim: true
  },
  category: {
    type: String,
    required: [true, 'Skill category is required'],
    enum: ['frontend', 'backend', 'database', 'tools', 'other'],
    default: 'other'
  },
  icon: {
    type: String,
    default: ''
  },
  proficiency: {
    type: Number,
    min: 0,
    max: 100,
    default: 50
  },
  order: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

export default mongoose.model('Skill', skillSchema);
