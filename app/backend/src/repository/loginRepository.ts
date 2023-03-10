import User from '../database/models/User';

import { ILoginModel } from '../interfaces/LoginInterfaces';
import { IUser } from '../interfaces/userInterface';

export default class LoginRepository implements ILoginModel {
  constructor(private model = User) {
    this.model = model;
  }

  login = async (email:string): Promise<IUser> => {
    const user = await this.model.findOne({ where: { email }, raw: true });

    return user as IUser;
  };
}
