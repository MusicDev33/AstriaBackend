import personService from '@services/person.service';
import { Request, Response } from 'express';
import { Person } from '@models/person.model';

export const addPersonRoute = async (req: Request, res: Response) => {
  const newPerson = new Person(req.body);

  const savedPerson = await personService.saveModel(newPerson);
  if (savedPerson) {
    return res.json({success: true, msg: 'Successfully added person'});
  } else {
    return res.json({success: false, msg: 'Could not add person...'});
  }
};
