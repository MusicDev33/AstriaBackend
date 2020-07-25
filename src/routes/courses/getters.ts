import { Request, Response } from 'express';
import courseService from '@services/course.service';
import enrollmentService from '@services/enrollment.service';
import assignmentService from '@services/assignment.service';

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
    return res.json({success: true, msg: 'Successfully found courses', payload: foundCourse});
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

export const getCourseAssignments = async (req: Request, res: Response) => {
  const foundAssignments = await assignmentService.findModelsByParameter('courseID', req.params.courseID, {name: 1}, 200);
  if (foundAssignments) {
    return res.json({success: true, msg: 'Found assignments.', payload: foundAssignments});
  }
  return res.json({success: false, msg: 'Could not find assignments...'});
};
