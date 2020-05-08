import personService from '@services/person.service';
import { Request, Response } from 'express';
import { Person } from '@models/person.model';

import { generatePassword } from '@utils/password.generator';

// Register person
export const getTeachersByParamRoute = async (req: Request, res: Response) => {

  if (req.params.param === 'password') {
    return res.json({success: false, msg: 'Param \'password\' does not exist!'});
  }

  const foundPeople = await personService.findPersonsByParameter(req.params.param, req.params.value)
  if (foundPeople) {
    return res.json({success: true, msg: 'Successfully found people', people: foundPeople});
  } else {
    return res.json({success: false, msg: 'Could not find people...'});
  }
};
