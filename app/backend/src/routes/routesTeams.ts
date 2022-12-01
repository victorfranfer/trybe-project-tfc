import { Router } from 'express';
import Repository from '../repository/teamsRepository';
import TeamsService from '../services/servicesTeams';
import TeamsController from '../controllers/controllersTeams';

const teamsRepository = new Repository();
const teamsService = new TeamsService(teamsRepository);
const teamsController = new TeamsController(teamsService);

const router = Router();

router.get('/', teamsController.getAll);
router.get('/:id', teamsController.getById);

export default router;
