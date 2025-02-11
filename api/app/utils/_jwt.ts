import jwt from 'jsonwebtoken'
import { ObjectId } from 'mongoose'


export const jwtSign = (id: ObjectId)  => {
  const accessToken = jwt.sign({ id }, process.env.JWT_SECRET as string, {
    expiresIn: process.env.JWT_EXPIRATION || '10h'
  })

  return { accessToken }
}

export const jwtVerify = ({ accessToken }: { accessToken: string }) => {
  return jwt.verify(accessToken, process.env.JWT_SECRET as string)
}

class jwtError extends jwt.JsonWebTokenError {
  constructor(message: string) {
    super(message);
    this.name = 'jwtError';
  }
}

export { jwtError };

