import { Request, Response } from 'express';
import AssignSubmissionService from '@services/assign-submission.service';

import { AssignSubmission } from '@schemas/assign-submission.schema';

import logger from '@config/logger';

export const createAssignSubmissionRoute = async (req: Request, res: Response) => {
  const newSubmission = new AssignSubmission(req.body);
  const savedSub = await AssignSubmissionService.saveModel(newSubmission);

  if (savedSub) {
    return res.json({success: true, msg: 'Submission saved successfully', payload: savedSub});
  }

  return res.json({success: false, msg: 'Could not save submission'});
}

export const autosaveSubmissionRoute = async (req: Request, res: Response) => {
  const newSubmission = new AssignSubmission(req.body);
  console.log(req.body._id);
  if (!req.body._id) {
    const savedSubmission = await AssignSubmissionService.saveModel(newSubmission);
    if (!savedSubmission) {
      logger.error('Could not save new submission in autosave');
      return res.status(500).json({success: false, msg: 'Could not autosave submission...'});
    }
  }

  const savedSub = await AssignSubmissionService.autosaveAssignmentSubmission(newSubmission, req.params.userID);

  if (savedSub) {
    return res.json({success: true, msg: 'Submission autosaved successfully.', payload: savedSub});
  }
  return res.status(500).json({success: false, msg: 'Could not autosave submission...'});
}

export const finalSaveSubmissionRoute = async (req: Request, res: Response) => {
  const newSubmission = new AssignSubmission(req.body);

  const savedSubmission = await AssignSubmissionService.finalSaveSubmission(newSubmission);

  if (savedSubmission) {
    return res.json({success: true, msg: 'Submission saved successfully.', payload: savedSubmission});
  }
  return res.status(500).json({success: false, msg: 'Could not save submission...'});
}

export const getSubmissionRoute = async (req: Request, res: Response) => {
  const query = {
    userID: req.params.userID,
    assignmentID: req.params.assignmentID
  }

  const submission = await AssignSubmissionService.findOneModelByQuery(query);

  if (submission) {
    return res.json({success: true, msg: 'Found submission.', payload: submission});
  }

  return res.status(404).json({success: false, msg: 'Could not find submission!'});
}
