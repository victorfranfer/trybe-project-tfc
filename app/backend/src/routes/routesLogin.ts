import { Router } from 'express';
import ControllersLogin from '../controllers/controllersLogin';

const routerLogin = Router();

const controllersLogin = new ControllersLogin();

routerLogin.post('/login', controllersLogin.userInfo);

export default routerLogin;
