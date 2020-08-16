import { Request, Response } from 'express';
import assignmentService from '@services/assignment.service';
import layoutService from '@services/layout.service';
import { Layout } from '@schemas/layout.schema';

import logger from '@config/logger';

// If anyone can think of a better way to check for null, please let me know.
// I know the code below is hideous...
export const autosaveLayoutRoute = async (req: Request, res: Response) => {
  const newLayout = new Layout(req.body);
  if (!req.body._id) {
    const savedNewLayout = await layoutService.saveModel(newLayout);
    if (!savedNewLayout) {
      logger.error('Could not save new layout in autosave');
      return res.status(500).json({success: false, msg: 'Could not autosave layout...'});
    }

    const assignment = await assignmentService.findOneModelByParameter('_id', req.params.assignmentID);
    if (!assignment) {
      logger.error(`Could not find assignment with _id: ${req.params.assignmentID} in autosave`);
      return res.status(500).json({success: false, msg: 'Could not autosave layout...'});
    }
    assignment.layoutID = savedNewLayout._id;
    await assignmentService.saveChangedModel(assignment, 'layoutID');
  }

  const savedLayout = await layoutService.autosaveLayout(newLayout);

  if (savedLayout) {
    return res.json({success: true, msg: 'Layout autosaved successfully.', payload: savedLayout});
  }
  return res.status(500).json({success: false, msg: 'Could not autosave layout...'});
}

export const finalAutosaveLayoutRoute = async (req: Request, res: Response) => {
  const newLayout = new Layout(req.body);

  const savedLayout = await layoutService.finalSaveLayout(newLayout);

  if (savedLayout) {
    return res.json({success: true, msg: 'Layout autosaved successfully.', payload: savedLayout});
  }
  return res.status(500).json({success: false, msg: 'Could not autosave layout...'});
}

export const getAssignmentLayoutRoute = async (req: Request, res: Response) => {
  const layout = await layoutService.findOneModelByParameter('assignmentID', req.params.assignmentID);

  if (layout) {
    return res.json({success: true, msg: 'Layout found.', payload: layout});
  }

  return res.status(200).json({success: false, msg: 'Could not find layout...'});
}
