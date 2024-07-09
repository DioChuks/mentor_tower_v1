import { Request, Response, NextFunction } from 'express';

const methodNotAllowed = (allowedMethods: { [key: string]: string[] }) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const methods = allowedMethods[req.path];
    if (methods && !methods.includes(req.method)) {
      res.status(405).json({ msg: `Method ${req.method} Not Allowed. Allowed methods: ${methods.join(', ')}` });
    } else {
      next();
    }
  };
};

export default methodNotAllowed;
