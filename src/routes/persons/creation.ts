import personService from '@services/person.service';
import { Request, Response } from 'express';
import { Person } from '@schemas/person.schema';

import { generatePassword } from '@utils/password.generator';
import { generateProfileURL } from '@utils/profileurl.generator';

// Register person
export const addPersonRoute = async (req: Request, res: Response) => {
  const newPerson = new Person(req.body);
  let password = '';
  if (newPerson.personType === 'instructor') {
    // Generate password - 12 chars, special alphanumeric
    password = generatePassword();
    newPerson.password = password;
  }

  // Generate profileURL
  let userProfileURL = generateProfileURL(newPerson.name);
  console.log(userProfileURL);
  const profileURLCount = await personService.countDocsByParameter('profileURL', userProfileURL);
  console.log(profileURLCount);

  if (profileURLCount && profileURLCount > 0) {
    userProfileURL += (profileURLCount + 1);
  }

  newPerson.profileURL = userProfileURL;

  const savedPerson = await personService.registerPerson(newPerson);
  if (savedPerson) {
    if (newPerson.personType === 'instructor') {
      return res.json({success: true, msg: 'Successfully added person', password: password})
    }
    return res.json({success: true, msg: 'Successfully added person'});
  } else {
    return res.json({success: false, msg: 'Could not add person...'});
  }
};
