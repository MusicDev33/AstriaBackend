import courseService from '@services/course.service';
import { Request, Response } from 'express';

export const getCoursesByParamRoute = async (req: Request, res: Response) => {
  if (req.params.param === 'password') {
    return res.json({success: false, msg: 'Param \'password\' does not exist!'});
  }

  const foundCourses = await courseService.findCoursesByParameter(req.params.param, req.params.value)
  if (foundCourses) {
    return res.json({success: true, msg: 'Successfully found courses', courses: foundCourses});
  } else {
    return res.json({success: false, msg: 'Could not find courses...'});
  }
};
