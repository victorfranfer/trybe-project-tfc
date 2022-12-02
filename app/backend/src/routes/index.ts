import { Router } from 'express';
import loginRoute from './routesLogin';
import teamsRoute from './routesTeams';
import matchesRoute from './routesMatches';
import leaderboardRoute from './routesLeaderboard';

const routes = Router();

routes.use('/login', loginRoute);
routes.use('/teams', teamsRoute);
routes.use('/matches', matchesRoute);
routes.use('/leaderboard', leaderboardRoute);

export default routes;
