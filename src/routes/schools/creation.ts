import schoolService from '@services/school.service';
import { Request, Response, NextFunction } from 'express';
import { School } from '@models/school.model';

export const addSchoolRoute = async (req: Request, res: Response, next: NextFunction) => {
  const newSchool = new School(req.body);

  const savedSchool = await schoolService.saveModel(newSchool);
  if (savedSchool) {
    return res.json({success: true, msg: 'Successfully added school'});
  } else {
    return res.json({success: false, msg: 'Could not add school...'});
  }
};
