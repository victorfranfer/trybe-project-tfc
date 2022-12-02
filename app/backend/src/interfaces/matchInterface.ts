import { Iteam } from './teamsInterface';

export default interface IMatch {
  id: number;
  homeTeam: number;
  homeTeamGoals: number;
  awayTeam: number;
  awayTeamGoals: number;
  inProgress: boolean;
  teamHome: Iteam;
  teamAway: Iteam;
}
