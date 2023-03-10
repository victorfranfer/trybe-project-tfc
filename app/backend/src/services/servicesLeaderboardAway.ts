import sequelize = require('sequelize');
import Match from '../database/models/Match';
import Team from '../database/models/Team';
import { efficiencyAway, pointsAway } from '../utils/leaderboardUtils';

export default class LeaderboardAwayService {
  private model = Match;

  async createLeaderboardAway() {
    const leaderboardAttributes = await this.model.findAll({ where: { inProgress: false },
      attributes: [
        [sequelize.literal(pointsAway), 'points'],
        [sequelize.fn('COUNT', sequelize.col('home_team')), 'games'],
        [sequelize.literal('SUM(home_team_goals > away_team_goals)'), 'wins'],
        [sequelize.literal('SUM(home_team_goals = away_team_goals)'), 'draws'],
        [sequelize.literal('SUM(home_team_goals < away_team_goals)'), 'losses'],
        [sequelize.fn('SUM', sequelize.col('home_team_goals')), 'goals'],
        [sequelize.fn('SUM', sequelize.col('away_team_goals')), 'goalsOwn'],
        [sequelize.literal('SUM(home_team_goals - away_team_goals)'), 'balanceGoals'],
        [sequelize.literal(efficiencyAway), 'efficiency']],
      include: [{ model: Team, as: 'teamHome', attributes: ['teamName'] }],
      group: ['home_team'],
      order: [
        [sequelize.literal('points'), 'DESC'], [sequelize.literal('wins'), 'DESC'],
        [sequelize.literal('balanceGoals'), 'DESC'], [sequelize.literal('goals'), 'DESC'],
        [sequelize.literal('goalsOwn'), 'ASC']] });
    return leaderboardAttributes;
  }

  async getLeaderboardAway() {
    const leaderboard = await this.createLeaderboardAway();

    const leaderboardSort = leaderboard.map((element) => ({
      name: (element.dataValues.teamHome.teamName),
      totalPoints: (Number(element.dataValues.points)),
      totalGames: (Number(element.dataValues.games)),
      totalVictories: (Number(element.dataValues.wins)),
      totalDraws: (Number(element.dataValues.draws)),
      totalLosses: (Number(element.dataValues.losses)),
      goalsFavor: (Number(element.dataValues.goals)),
      goalsOwn: (Number(element.dataValues.goalsOwn)),
      goalsBalance: (Number(element.dataValues.balanceGoals)),
      efficiency: (Number(element.dataValues.efficiency)),
    }));

    return leaderboardSort;
  }
}
