import { Request, Response } from 'express';
import enrollmentService from '@services/enrollment.service';
import personService from '@services/person.service';
import { Enrollment } from '@schemas/enrollment.schema';

export const enrollStudentRoute = async (req: Request, res: Response) => {
  const student = await personService.findOneModelByParameter('_id', req.body.studentID);

  if (!student) {
    return res.json({success: false, msg: 'Could not find student'});
  }

  req.body.studentName = student.name;

  const newEnrollment = new Enrollment(req.body);
  const query = {
    studentID: newEnrollment.studentID,
    courseID: newEnrollment.courseID
  };

  const studentAlreadyInCourse = await enrollmentService.findOneModelByQuery(query);

  if (studentAlreadyInCourse) {
    return res.json({success: false, msg: 'Student is already enrolled in course!'});
  }

  const enrolledStudent = await enrollmentService.saveModel(newEnrollment);

  if (enrolledStudent) {
    return res.json({success: true, msg: 'Successfully enrolled student!', payload: enrolledStudent});
  }
  return res.json({success: false, msg: 'Could not enroll student...'});
};
