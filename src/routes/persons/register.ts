import personService from '@services/person.service';
import { Request, Response } from 'express';
import { Person } from '@models/person.model';

import { validateRegister } from '@validate/register.validate';

export const registerPersonRoute = async (req: Request, res: Response) => {
  const validation = validateRegister(req.body);
  if (!validation.success) {
    return res.json(validation);
  }

  const newPerson = new Person(req.body);

  const couldSavePerson = await personService.saveModel(newPerson);

  if (couldSavePerson) {
    return res.json({success: true, msg: `Successfully added new user: ${newPerson.name}`});
  }
  return res.json({sucess: false, msg: 'Could not save person'});
};
