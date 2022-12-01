import { Router } from 'express';
import ControllersLogin from '../controllers/controllersLogin';
import Repository from '../repository/loginRepository';
import Service from '../services/servicesLogin';
import validateLogin from '../middlewares/validateLoginMiddleware';
import validateToken from '../middlewares/tokenMiddleware';

const routerLogin = Router();

const loginRepository = new Repository();
const loginService = new Service(loginRepository);
const controllersLogin = new ControllersLogin(loginService);

routerLogin.post('/', validateLogin, controllersLogin.login);
routerLogin.get('/validate', validateToken);

export default routerLogin;
