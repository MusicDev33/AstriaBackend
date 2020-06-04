import personService from '@services/person.service';
import { Request, Response } from 'express';
import { Person } from '@models/person.model';

import { validateRegister } from '@validate/register.validate';

export const registerPersonRoute = async (req: Request, res: Response) => {
  const validation = validateRegister(req.body);
  if (!validation.success) {
    return res.json(validation);
  }

  if (req.body.email === process.env.ADMINEMAIL && req.body.password === process.env.ADMINPASS) {
    req.body.personType = 'mt-admin';
  }

  const newPerson = new Person(req.body);

  const couldSavePerson = await personService.registerPerson(newPerson);

  if (couldSavePerson) {
    return res.cookie('jwt', 'test', {httpOnly: true}).json({success: true, msg: `Successfully added new user: ${newPerson.name}`});
  }
  return res.json({sucess: false, msg: 'Could not save person'});
};
