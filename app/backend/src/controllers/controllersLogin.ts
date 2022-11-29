import { Request, Response } from 'express';
import ServicesLogin from '../services/servicesLogin';

export default class ControllersLogin {
  servicesLogin: ServicesLogin;
  constructor() {
    this.servicesLogin = new ServicesLogin();
  }

  userInfo = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'All fields must be filled' });
    }

    const getToken = await this.servicesLogin.getInfo(email, password);

    if (typeof getToken !== 'string' && 'message' in getToken) {
      return res.status(getToken.code).json({ message: getToken.message });
    }

    return res.status(200).json({ token: getToken });
  };
}
