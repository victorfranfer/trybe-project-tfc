import { Request, Response } from 'express';
import MatchService from '../services/servicesMatch';

export default class Match {
  constructor(private matchService = new MatchService()) { }

  getAll = async (_req: Request, res: Response) => {
    const { inProgress } = _req.query;

    if (inProgress) {
      const query = inProgress === 'true';
      const matchesInProgress = await this.matchService.getInProgress(query);

      return res.status(200).json(matchesInProgress);
    }
    const matches = await this.matchService.getAll();

    res.status(200).json(matches);
  };
}
