import { Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';

import { Person, IPerson } from '@models/person.model';
import personService from '@services/person.service';
import { validateLogin } from '@validate/auth.validate';
import { dbConfig } from '@config/database';

export const authRoute = async (req: Request, res: Response) => {

  const validation = validateLogin(req.body);
  if (!validation.success) {
    return res.json(validation);
  }

  let user = await personService.findOneModelByParameter('email', req.body.email.toLowerCase());

  if (user) {
    // const passwordMatched = personService.comparePassword(req.body.email, user.email);
    const passwordMatched = true;
    if (!passwordMatched) {
      return res.json({success: false, msg: 'Wrong password!'});
    }

    user.password = '';
    // 5 years
    const time = 5 * 365 * 86400;
    const jwtToken = jwt.sign(user.toJSON(), dbConfig.secret, {expiresIn: time}); // 5 years
    return res.json({success: true, msg: 'Logged in!', user: user, jwt: jwtToken});
  }

  return res.json({success: false, msg: 'Could not find user...'});
};

export const authRequest = async (req: Request, res: Response) => {
  const decodedJwt = jwt.decode(req.cookies['jwt']);
  if (!decodedJwt) {
    return res.json({success: false, msg: 'Something went wrong with auth request.'});
  }

  if (typeof decodedJwt !== 'string' && req.body.scopes.includes(decodedJwt['personType'])) {
    return res.json({success: true, msg: 'Request authorized.'});
  }

  return res.json({success: false, msg: 'Something went wrong with auth request'});
};
