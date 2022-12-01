import Teams from '../database/models/Team';
import { Iteamm } from '../interfaces/teamsInterface';

export default class TeamRepository implements Iteamm {
  constructor(private model = Teams) {
    this.model = model;
  }

  getAll = async () => {
    const results = await this.model.findAll();
    return results;
  };

  getById = async (id: number) => {
    const result = await this.model.findOne({ where: { id } });
    return result;
  };
}
