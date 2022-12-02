import { Request, Response } from 'express';
import LeaderboardHomeService from '../services/servicesLeaderboardHome';
import LeaderboardAwayService from '../services/servicesLeaderboardAway';

export default class leaderboard {
  constructor(
    private leaderboardHomeService = new LeaderboardHomeService(),
    private leaderboardAwayService = new LeaderboardAwayService(),
  ) { }

  getLeaderboardHome = async (_req: Request, res: Response) => {
    const completeLeaderboardHome = await this.leaderboardHomeService.getLeaderboardHome();

    return res.status(200).json(completeLeaderboardHome);
  };

  getLeaderboardAway = async (_req: Request, res: Response) => {
    const completeLeaderboardAway = await this.leaderboardAwayService.getLeaderboardAway();

    return res.status(200).json(completeLeaderboardAway);
  };
}
