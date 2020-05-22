import personService from '@services/person.service';
import courseService from '@services/course.service';
import { Request, Response } from 'express';

// Register person
export const getTeachersByParamRoute = async (req: Request, res: Response) => {

  if (req.params.param === 'password') {
    return res.json({success: false, msg: 'Param \'password\' does not exist!'});
  }

  const foundPeople = await personService.findModelsByParameter(req.params.param, req.params.value);
  if (foundPeople) {
    return res.json({success: true, msg: 'Successfully found people', people: foundPeople});
  }
  return res.json({success: false, msg: 'Could not find people...'});
};

export const getInstructorCoursesRoute = async (req: Request, res: Response) => {
  const query = {
    schoolID: req.params.schoolID,
    instructorIDs: req.params.instructorID
  }

  const foundCourses = await courseService.findModelsByQuery(query);
  if (foundCourses) {
    return res.json({success: true, msg: 'Successfully found courses', courses: foundCourses});
  }
  return res.json({success: false, msg: 'Could not find courses...'});
}
