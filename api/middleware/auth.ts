import { Request, Response, NextFunction } from 'express';
import passport from 'passport';
import { StatusCodes, ReasonPhrases } from 'http-status-codes';
import ApiError from '../errors/ApiError';
import { roleRights } from '@/@types/role';
import { IUserDoc } from '@/@types/user.interfaces';
import { jwtError } from '@/utils/jwt';
import { getAccessTokenFromHeaders } from '@/utils/headers';

const IsAuth = (...requiredRights: string[]) =>
  async (req: Request, res: Response, next: NextFunction) => {
  const {accessToken} = getAccessTokenFromHeaders(req.headers);

  if (!accessToken) {
    return res.status(StatusCodes.UNAUTHORIZED).json({ 
      message: ReasonPhrases.UNAUTHORIZED,
      status: StatusCodes.UNAUTHORIZED
    });
  }

  try {
    new Promise<void>((resolve, reject) => {
      passport.authenticate('jwt', { session: false }, verifyCallback(req, resolve, reject, requiredRights))(req, res, next);
    })
      .then(() => next())
      .catch((err) => next(err));
  } catch (err) {
    if (err instanceof jwtError) {
      return res.status(StatusCodes.FORBIDDEN).json({ 
        message: ReasonPhrases.FORBIDDEN,
        status: StatusCodes.FORBIDDEN 
      });
    }
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: ReasonPhrases.INTERNAL_SERVER_ERROR,
      status: StatusCodes.INTERNAL_SERVER_ERROR
    });
  }
};



const verifyCallback =
  (req: Request, resolve: any, reject: any, requiredRights: string[]) =>
  async (err: Error, user: IUserDoc, info: string) => {
    if (err || info || !user) {
      return reject(new ApiError(StatusCodes.UNAUTHORIZED, 'Please authenticate'));
    }
    req.user = user;

    if (requiredRights.length) {
      const userRights = roleRights.get(user.role);
      if (!userRights) return reject(new ApiError(StatusCodes.FORBIDDEN, 'Forbidden'));
      const hasRequiredRights = requiredRights.every((requiredRight: string) => userRights.includes(requiredRight));
      if (!hasRequiredRights && req.params['userId'] !== user.id) {
        return reject(new ApiError(StatusCodes.FORBIDDEN, 'Forbidden'));
      }
    }

    resolve();
};

export default IsAuth;