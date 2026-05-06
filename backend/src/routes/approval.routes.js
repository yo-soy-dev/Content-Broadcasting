import express from 'express';
import {
  getAllContent,
  getPendingContent,
  approveContent,
  rejectContent,
  getPrincipalStats,
} from '../controllers/approval.controller.js';
import { protect } from '../middleware/auth.middleware.js';
import { authorizeRoles } from '../middleware/role.middleware.js';

const router = express.Router();

router.use(protect, authorizeRoles('principal'));

router.get('/all', getAllContent);
router.get('/pending', getPendingContent);
router.get('/stats', getPrincipalStats);
router.patch('/:id/approve', approveContent);
router.patch('/:id/reject', rejectContent);

export default router;