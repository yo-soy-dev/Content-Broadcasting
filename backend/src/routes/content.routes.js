import express from 'express';
import {
  uploadContent,
  getMyContent,
  getTeacherStats,
  getLiveContent,
  deleteContent,
} from '../controllers/content.controller.js';
import { protect } from '../middleware/auth.middleware.js';
import { authorizeRoles } from '../middleware/role.middleware.js';
import upload from '../middleware/upload.middleware.js';

const router = express.Router();

router.get('/live/:teacherId', getLiveContent);

router.use(protect, authorizeRoles('teacher'));
router.post('/upload', upload.single('file'), uploadContent);
router.get('/my', getMyContent);
router.get('/my/stats', getTeacherStats);
router.delete('/:id', deleteContent);

export default router;