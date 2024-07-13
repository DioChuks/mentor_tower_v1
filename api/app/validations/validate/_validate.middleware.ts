import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';
import { StatusCodes } from 'http-status-codes';
import pick from '../../utils/_pick';
import ApiError from '../../../errors/_ApiError';

const validate = (schema: Record<string, any>) => (req: Request, _res: Response, next: NextFunction): void => {
  const validSchema = pick(schema, ['params', 'query', 'body']);
  const object = pick(req, Object.keys(validSchema));
  console.log('Object to be validated:', object); // Log the object to be validated
  const { value, error } = Joi.compile(validSchema)
    .prefs({ errors: { label: 'key' } })
    .validate(object);

  if (error) {
    const errorMessage = error.details.map((details) => details.message).join(', ');
    return next(new ApiError(StatusCodes.BAD_REQUEST, errorMessage));
  }
  Object.assign(req, value);
  console.log('Validated value:', value); // Log the validated value
  return next();
};

export default validate;
