import { PassportStatic } from 'passport';
import { Request } from 'express';
import { Strategy, StrategyOptions } from 'passport-jwt';

import { IPerson } from '@models/person.model';
import personService from '@services/person.service';
import { dbConfig } from '@config/database';

const cookieExtractor = function(req: Request) {
  let token = null;
  if (req && req.cookies) {
    token = req.cookies['jwt'];
  }
  return token;
};

export const userPassportAuth = async (passport: PassportStatic) => {
  const options: StrategyOptions = {
    secretOrKey: dbConfig.secret,
    jwtFromRequest: cookieExtractor
  };

  passport.use(new Strategy(options, async (jwtPayload: IPerson, next: any) => {
    const foundUser = await personService.findOnePersonByParameter('_id', jwtPayload._id);
    if (foundUser) {
      return next(null, foundUser);
    } else {
      return next(null, null);
    }
  }));
};
