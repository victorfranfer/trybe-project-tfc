import { Router } from 'express';
// import LeaderboardHomeService from '../services/servicesLeaderboardHome';
// import LeaderboardAwayService from '../services/servicesLeaderboardAway';
import LeaderboardController from '../controllers/controllersLeaderboard';

// const leaderboardHomeService = new LeaderboardHomeService();
const leaderboardHomeController = new LeaderboardController();

// const leaderboardAwayService = new LeaderboardAwayService();
const leaderboardAwayController = new LeaderboardController();

const router = Router();

router.get('/home', leaderboardHomeController.getLeaderboardHome);
router.get('/away', leaderboardAwayController.getLeaderboardAway);

export default router;
