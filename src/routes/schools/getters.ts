import schoolService from '@services/school.service';
import courseService from '@services/course.service';
import personService from '@services/person.service';

import { Request, Response } from 'express';

export const getAllSchoolsRoute = async (req: Request, res: Response) => {
  const allSchools = await schoolService.getAllSchools();

  if (allSchools) {
    return res.json({success: true, msg: 'Successfully added school', schools: allSchools});
  }
  return res.json({success: false, msg: 'Could not add school...'});
};

export const getSchoolInstructorsRoute = async (req: Request, res: Response) => {
  const query = {
    personType: 'instructor',
    schoolID: req.params.schoolID
  }
  const schoolInstructors = await personService.findModelsByQuery(query);

  if (schoolInstructors) {
    return res.json({success: true, msg: 'Found instructors!', instructors: schoolInstructors})
  }
  return res.json({success: false, msg: 'Could not find instructors'});
};

export const getInstructorCoursesRoute = async (req: Request, res: Response) => {
  let query = {
    schoolID: req.params.schoolID,
    instructorID: req.params.profileURL
  };

  const foundCourses = await courseService.findModelsByQuery(query);
  if (foundCourses) {
    return res.json({success: true, msg: 'Successfully found courses', courses: foundCourses});
  } else {
    return res.json({success: false, msg: 'Could not find courses...'});
  }
};
