import { Request, Response } from 'express';
import assignmentService from '@services/assignment.service';
import layoutService from '@services/layout.service';
import { Layout } from '@models/layout.model'

export const addAssignmentLayoutRoute = async (req: Request, res: Response) => {
  const assignment = await assignmentService.findOneModelByParameter('_id', req.params.assignmentID);

  if (!assignment) {
    return res.json({success: false, msg: 'Could not find assignment'});
  }

  const newLayout = await layoutService.saveModel(new Layout(req.body));

  if (!newLayout) {
    return res.json({success: false, msg: 'Could not find or create layout.'});
  }

  assignment.layoutID = newLayout._id;

  await assignmentService.saveChangedModel(assignment, 'layoutID');

  return res.json({success: true, msg: 'Saved assignment.', assignment: assignment});
};
