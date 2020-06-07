import { Request, Response } from 'express';
import enrollmentService from '@services/enrollment.service';
import courseService from '@services/course.service';
import { Enrollment } from '@models/enrollment.model';

// Get rid of this.
export const getCourseEnrollmentsByParamRoute = async (req: Request, res: Response) => {

  const enrolledStudents = await enrollmentService.findModelsByParameter(req.params.param, req.params.paramValue)

  if (enrolledStudents) {
    return res.json({success: true, msg: 'Found enrollments', payload: enrolledStudents});
  }
  return res.json({success: false, msg: 'Could not find enrollments...'});
};

export const getStudentCourseEnrollmentsRoute = async (req: Request, res: Response) => {
  const enrollments = await enrollmentService.findModelsByParameter('studentID', req.params.studentID);

  if (!enrollments) {
    return res.json({success: false, msg: 'Could not find enrollments...'});
  }
  const enrolledCourses = await courseService.getEnrolledCourses(enrollments);

  if (enrolledCourses) {
    return res.json({success: true, msg: 'Found courses.', payload: enrolledCourses});
  }

  return res.json({success: false, msg: 'Could not find courses...'});
};
