import { Request, Response } from 'express';
import assignmentService from '@services/assignment.service';
import { Assignment } from '@schemas/assignment.schema';

// Move this to courses?
export const getAssignmentForStudentRoute = async (req: Request, res: Response) => {
  const assignments = await assignmentService.findModelsByParameter('courseID', req.params.courseID);

  if (assignments) {
    return res.json({success: true, msg: 'Layout found.', payload: assignments});
  }

  return res.status(500).json({success: false, msg: 'Could not find layout...'});
}
