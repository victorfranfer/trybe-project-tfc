import { Iteamm, Iteam } from '../interfaces/teamsInterface';
import ErrorHandler from '../utils/errorHandlerUtil';
import { STATUS_NOT_FOUND } from '../utils/httpStatusUtil';
import { MSG_TEAM_ID_NOT_FOUND } from '../utils/returnedMessagesUtils';

require('express-async-errors');

export default class TeamsService implements Iteamm {
  constructor(private model: Iteamm) {
    this.model = model;
  }

  async getAll(): Promise<Iteam[]> {
    const results = await this.model.getAll();
    return results;
  }

  async getById(id: number): Promise<Iteam | null> {
    const result = await this.model.getById(id);
    if (!result) throw new ErrorHandler(STATUS_NOT_FOUND, MSG_TEAM_ID_NOT_FOUND);
    return result;
  }
}
