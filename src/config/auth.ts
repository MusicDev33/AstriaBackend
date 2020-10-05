import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

import { IPerson } from '@models/person.model';
import personService from '@services/person.service';
import { validateVitalEnv } from '@validate/env.validate';

const DB_SECRET = validateVitalEnv('DB_SECRET');

const extractTokenFromCookie = (req: Request) => {
  let token = null;
  /*
  if (req && req.cookies) {
    token = req.cookies['jwt'];
  }
  */
  token = req.get('ID-JWT') as string | null;
  return token;
};

export const userAuth = (role?: number) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const token = extractTokenFromCookie(req);

    if (!token) {
      return res.status(401).send('Unauthorized');
    }

    const decodedToken = jwt.verify(token, DB_SECRET) as IPerson;

    if (!decodedToken || typeof decodedToken === 'string') {
      return res.status(401).send('Unauthorized');
    }

    const foundUser = await personService.findOneModelByParameter('_id', decodedToken._id);
    if (foundUser) {
      return next();
    } else {
      console.log('Passport Auth failed, jwt: ' + decodedToken);
      return next();
    }
  };
};
