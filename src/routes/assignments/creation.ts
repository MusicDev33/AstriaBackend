import { Request, Response } from 'express';
import assignmentService from '@services/assignment.service';
import { Assignment } from '@schemas/assignment.schema';

export const createAssignmentRoute = async (req: Request, res: Response) => {
  const newAssignment = new Assignment(req.body);

  const savedAssignment = await assignmentService.saveModel(newAssignment);

  if (savedAssignment) {
    return res.json({success: true, msg: 'Assignment saved successfully.', payload: savedAssignment});
  }
  return res.status(500).json({success: false, msg: 'Could not save announcement...'});
};
