import { Router } from 'express';
import MatchService from '../services/servicesMatch';
import MatchController from '../controllers/controllersMatches';
import MatchValidation from '../middlewares/matchValidation';

const matchService = new MatchService();
const matchController = new MatchController(matchService);
const matchValidation = new MatchValidation();

const router = Router();

router.get('/', matchController.getAll);
router.post('/', matchValidation.matchValid, matchController.createMatch);
router.patch('/:id/finish', matchController.finishMatch);

export default router;
