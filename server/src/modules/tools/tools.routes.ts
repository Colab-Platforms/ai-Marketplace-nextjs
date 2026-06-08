import { Router } from 'express';
import { listTools, getTool } from './tools.controller';

const router = Router();

router.get('/', listTools);
router.get('/:id', getTool);

export default router;
