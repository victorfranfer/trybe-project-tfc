import { Router } from 'express';
import MatchService from '../services/servicesMatch';
import MatchController from '../controllers/controllersMatches';

const matchService = new MatchService();
const matchController = new MatchController(matchService);

const router = Router();

router.get('/', matchController.getAll);
router.post('/', matchController.createMatch);

export default router;
