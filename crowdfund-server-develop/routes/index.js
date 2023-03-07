import { Router } from 'express';
import userRouter from './api/userRoutes.js';
import campaignRouter from './api/campaignRoutes.js';
import contributionRouter from './api/contributionRoutes.js';

const router = Router();

router.use('/api/users', userRouter);
router.use('/api/campaigns', campaignRouter);
router.use('/api/contributions', contributionRouter);

export default router;
