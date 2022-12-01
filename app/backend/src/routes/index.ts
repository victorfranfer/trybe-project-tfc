import { Router } from 'express';
import loginRoute from './routesLogin';
import teamsRoute from './routesTeams';

const routes = Router();

routes.use('/login', loginRoute);
routes.use('/teams', teamsRoute);

export default routes;
