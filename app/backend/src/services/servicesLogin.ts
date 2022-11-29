import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import User from '../database/models/User';

const pass = 'jwt_secret';
const jwtConfig = {
  expiresIn: '7d',
};

export default class GetUserInfo {
  getInfo = async (email: string, password: string) => {
    const userInfo = await User.findOne({ where: { email } });

    if (!userInfo) {
      return { code: 401, message: 'Incorrect email or password' };
    }

    const userPassValid = await bcrypt.compare(password, userInfo.password);

    if (!userPassValid) {
      return { code: 401, message: 'Incorrect email or password' };
    }

    const jwToken = jwt.sign({ id: userInfo.id }, pass, jwtConfig);

    return jwToken;
  };
}
