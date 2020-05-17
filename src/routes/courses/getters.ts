import courseService from '@services/course.service';
import { Request, Response } from 'express';

export const getCoursesByParamRoute = async (req: Request, res: Response) => {
  const foundCourses = await courseService.findCoursesByParameter(req.params.param, req.params.value)
  if (foundCourses) {
    return res.json({success: true, msg: 'Successfully found courses', courses: foundCourses});
  }
  return res.json({success: false, msg: 'Could not find courses...'});
};

export const getCourseForInstructorRoute = async (req: Request, res: Response) => {
  const query = {
    courseCode: req.params.courseCode,
    schoolID: req.params.schoolID,
    instructorIDs: req.params.instructorID
  }

  const foundCourse = await courseService.findOneCourseByQuery(query);

  if (foundCourse) {
    return res.json({success: true, msg: 'Successfully found courses', course: foundCourse});
  }
  return res.json({success: false, msg: 'Could not find courses...'});
};
