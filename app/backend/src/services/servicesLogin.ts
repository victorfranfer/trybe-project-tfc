import { ILoginModel, ILoginService } from '../interfaces/LoginInterfaces';
import { generateToken } from '../utils/jwtToken';
import { validatePassword } from '../utils/validatePassword';
import ErrorHandler from '../utils/errorHandlerUtil';

require('express-async-errors');

export default class LoginService implements ILoginService {
  constructor(private model: ILoginModel) {
    this.model = model;
  }

  async login(email: string, password: string): Promise<string> {
    const user = await this.model.login(email);

    if (!user) throw new ErrorHandler(401, 'Incorrect email or password');

    validatePassword(password, user.password);

    return generateToken(user);
  }
}
