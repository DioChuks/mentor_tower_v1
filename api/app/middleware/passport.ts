import { ExtractJwt, Strategy as JwtStrategy } from 'passport-jwt';
import tokenTypes from '@/@types/_token.types';
import config from '@/app/config/config';
import User from '@/app/models/user';
import { IPayload } from '@/@types/_token.interfaces';

const jwtStrategy = new JwtStrategy(
  {
    secretOrKey: config.jwt.secret,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  },
  async (payload: IPayload, done) => {
    try {
      if (payload.type !== tokenTypes.ACCESS) {
        throw new Error('Invalid token type');
      }
      const user = await User.findById(payload.sub);
      if (!user) {
        return done(null, false);
      }
      done(null, user);
    } catch (error) {
      done(error, false);
    }
  }
);

export default jwtStrategy;
