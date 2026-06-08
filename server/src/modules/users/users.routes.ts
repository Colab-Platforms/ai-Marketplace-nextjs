import { Router } from 'express';
import { getProfile, listUsers } from './users.controller';
import { authMiddleware } from '../../middleware/auth.middleware';

const router = Router();

router.use(authMiddleware);
router.get('/', listUsers);
router.get('/me', getProfile);

export default router;
