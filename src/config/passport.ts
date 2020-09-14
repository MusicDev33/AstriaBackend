import { PassportStatic } from 'passport';
import { Request } from 'express';
import { Strategy, StrategyOptions } from 'passport-jwt';

import { IPerson } from '@models/person.model';
import personService from '@services/person.service';
import { dbConfig } from '@config/database';

const cookieExtractor = (req: Request) => {
  let token = null;
  /*
  if (req && req.cookies) {
    token = req.cookies['jwt'];
  }
  */
  token = req.get('ID-JWT') as string | null;
  return token;
};

export const userPassportAuth = async (passport: PassportStatic) => {
  const options: StrategyOptions = {
    secretOrKey: process.env.DB_SECRET,
    jwtFromRequest: cookieExtractor
  };

  passport.use('jwt', new Strategy(options, async (jwtPayload: IPerson, next: any) => {
    const foundUser = await personService.findOneModelByParameter('_id', jwtPayload._id);
    console.log('passport');
    if (foundUser) {
      return next(null, foundUser);
    } else {
      console.log('Passport Auth failed, jwt: ' + jwtPayload);
      return next(null, null);
    }
  }));
};

const userOptions: StrategyOptions = {
  secretOrKey: process.env.DB_SECRET,
  jwtFromRequest: cookieExtractor
};

export const userAuthStrategy = new Strategy(userOptions, async (jwtPayload: IPerson, next: any) => {
  console.log('test');
  const foundUser = await personService.findOneModelByParameter('_id', jwtPayload._id);
  if (foundUser) {
    return next(null, foundUser);
  } else {
    console.log('Passport Auth failed, jwt: ' + jwtPayload);
    return next(null, null);
  }
});

export const adminPassportAuth = async (passport: PassportStatic) => {
  const options: StrategyOptions = {
    secretOrKey: process.env.DB_SECRET,
    jwtFromRequest: cookieExtractor
  };

  passport.use('mt-admin', new Strategy(options, async (jwtPayload: IPerson, next: any) => {
    const foundUser = await personService.findOneModelByParameter('_id', jwtPayload._id);
    if (foundUser && foundUser.personType === 'mt-admin') {
      return next(null, foundUser);
    } else {
      console.log('Passport Auth failed, jwt: ' + jwtPayload);
      return next(null, null);
    }
  }));
};

const adminOptions: StrategyOptions = {
  secretOrKey: process.env.DB_SECRET,
  jwtFromRequest: cookieExtractor
};

export const asAdminStrategy = new Strategy(adminOptions, async (jwtPayload: IPerson, next: any) => {
  const foundUser = await personService.findOneModelByParameter('_id', jwtPayload._id);
  if (foundUser && foundUser.personType === 'mt-admin') {
    return next(null, foundUser);
  } else {
    console.log('Passport Auth failed, jwt: ' + jwtPayload);
    return next(null, null);
  }
});
