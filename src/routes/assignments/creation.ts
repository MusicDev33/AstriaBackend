import { Request, Response } from 'express';
import assignmentService from '@services/assignment.service';
import { Assignment } from '@models/assignment.model';

export const createAssignmentRoute = async (req: Request, res: Response) => {
  const newAssignment = new Assignment(req.body);

  const savedAssignment = await assignmentService.saveModel(newAssignment);

  if (savedAssignment) {
    return res.json({success: true, msg: 'Assignment saved successfully.', assignment: savedAssignment});
  }
  return res.status(500).json({success: false, msg: 'Could not save announcement...'});
};
