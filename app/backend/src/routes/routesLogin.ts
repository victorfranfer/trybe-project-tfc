import { Router } from 'express';
import Controller from '../controllers/controllersLogin';
import Repository from '../repository/loginRepository';
import Service from '../services/servicesLogin';
import validateLogin from '../middlewares/validateLoginMiddleware';
import validateToken from '../middlewares/tokenMiddleware';

const routerLogin = Router();

const loginRepository = new Repository();
const loginService = new Service(loginRepository);
const loginController = new Controller(loginService);

routerLogin.post('/', validateLogin, loginController.login);
routerLogin.get('/validate', validateToken);

export default routerLogin;
