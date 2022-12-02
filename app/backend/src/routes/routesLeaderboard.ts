import { Router } from 'express';
import LeaderboardService from '../services/servicesLeaderboard';
import LeaderboardController from '../controllers/controllersLeaderboard';

const leaderboardService = new LeaderboardService();
const leaderboardController = new LeaderboardController(leaderboardService);

const router = Router();

router.get('/home', leaderboardController.getLeaderboard);

export default router;
