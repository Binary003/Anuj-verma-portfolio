import express from 'express';
import {
  submitContact,
  getContacts,
  getContact,
  markAsRead,
  deleteContact
} from '../controllers/contactController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Public route (for frontend contact form)
router.post('/', submitContact);

// Protected routes (Admin only)
router.get('/', protect, getContacts);
router.get('/:id', protect, getContact);
router.put('/:id/read', protect, markAsRead);
router.delete('/:id', protect, deleteContact);

export default router;
