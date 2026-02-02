import express from 'express';
import {
  getSkills,
  getSkillsByCategory,
  getSkill,
  createSkill,
  updateSkill,
  deleteSkill
} from '../controllers/skillController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Public routes
router.get('/', getSkills);
router.get('/category/:category', getSkillsByCategory);
router.get('/:id', getSkill);

// Protected routes (Admin only)
router.post('/', protect, createSkill);
router.put('/:id', protect, updateSkill);
router.delete('/:id', protect, deleteSkill);

export default router;
