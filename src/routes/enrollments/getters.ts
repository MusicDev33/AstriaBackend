import { Request, Response } from 'express';
import enrollmentService from '@services/enrollment.service';
import { Enrollment } from '@models/enrollment.model';

// Get rid of this.
export const enrollStudentRoute = async (req: Request, res: Response) => {
  const newEnrollment = new Enrollment({
    studentID: req.params.studentID,
    courseID: req.params.courseID,
    schoolID: req.params.schoolID,
    instructorID: req.params.instructorID
  });

  const enrolledStudent = await enrollmentService.saveModel(newEnrollment);

  if (enrolledStudent) {
    return res.json({success: true, msg: 'Successfully enrolled student!', enrollment: enrolledStudent});
  }
  return res.json({success: false, msg: 'Could not enroll student...'});
};