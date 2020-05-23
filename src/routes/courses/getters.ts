import { Request, Response } from 'express';
import courseService from '@services/course.service';
import enrollmentService from '@services/enrollment.service';

export const getCoursesByParamRoute = async (req: Request, res: Response) => {
  const foundCourses = await courseService.findModelsByParameter(req.params.param, req.params.value)
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

  const foundCourse = await courseService.findOneModelByQuery(query);

  if (foundCourse) {
    return res.json({success: true, msg: 'Successfully found courses', course: foundCourse});
  }
  return res.json({success: false, msg: 'Could not find courses...'});
};

export const getCourseEnrollments = async (req: Request, res: Response) => {
  const foundEnrollments = await enrollmentService.findModelsByParameter('courseID', req.params.courseID, {name: 1}, 200);

  if (foundEnrollments) {
    return res.json({success: true, msg: 'Found enrollments.', enrollments: foundEnrollments});
  }
  return res.json({success: false, msg: 'Could not find enrollments...'});
};
