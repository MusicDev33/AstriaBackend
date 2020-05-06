import schoolService from '@services/school.service';
import { Request, Response } from 'express';

export const getAllSchoolsRoute = async (req: Request, res: Response) => {
  const allSchools = await schoolService.getAllSchools();

  if (allSchools) {
    return res.json({success: true, msg: 'Successfully added school', schools: allSchools});
  } else {
    return res.json({success: false, msg: 'Could not add school...'});
  }
};
