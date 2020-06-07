import { PassportStatic } from 'passport';
import { Request } from 'express';
import { Strategy, StrategyOptions } from 'passport-jwt';

import { IPerson } from '@models/person.model';
import personService from '@services/person.service';
import { dbConfig } from '@config/database';

const cookieExtractor = (req: Request) => {
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

  passport.use('jwt', new Strategy(options, async (jwtPayload: IPerson, next: any) => {
    const foundUser = await personService.findOneModelByParameter('_id', jwtPayload._id);
    if (foundUser) {
      console.log('Passport Auth succeeded, jwt: ' + jwtPayload);
      return next(null, foundUser);
    } else {
      console.log('Passport Auth failed, jwt: ' + jwtPayload);
      return next(null, null);
    }
  }));
};

export const adminPassportAuth = async (passport: PassportStatic) => {
  const options: StrategyOptions = {
    secretOrKey: dbConfig.secret,
    jwtFromRequest: cookieExtractor
  };

  passport.use('mt-admin', new Strategy(options, async (jwtPayload: IPerson, next: any) => {
    const foundUser = await personService.findOneModelByParameter('_id', jwtPayload._id);
    if (foundUser && foundUser.personType === 'mt-admin') {
      return next(null, foundUser);
    } else {
      return next(null, null);
    }
  }));
};

const adminOptions: StrategyOptions = {
  secretOrKey: dbConfig.secret,
  jwtFromRequest: cookieExtractor
};

export const asAdminStrategy = new Strategy(adminOptions, async (jwtPayload: IPerson, next: any) => {
  const foundUser = await personService.findOneModelByParameter('_id', jwtPayload._id);
  if (foundUser && foundUser.personType === 'mt-admin') {
    return next(null, foundUser);
  } else {
    return next(null, null);
  }
})
