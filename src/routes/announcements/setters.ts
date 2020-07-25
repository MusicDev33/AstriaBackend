import { Request, Response } from 'express';
import readTrackerService from '@services/readtracker.service';
import { ReadTracker, IReadTracker } from '@models/read-tracker.model';

export const readOneAnnouncementRoute = async (req: Request, res: Response) => {
  const readTracker = new ReadTracker({
    userID: req.body.userID,
    type: 'announcement',
    documentID: req.body.documentID,
    isRead: true
  });

  const createdReadTracker = await readTrackerService.saveModel(readTracker);

  if (createdReadTracker) {
    return res.json({success: true, msg: 'Success'});
  }
  return res.status(500).json({success: false, msg: 'Could not read announcement...'});
};

export const readAnnouncementsRoute = async (req: Request, res: Response) => {
  const documentIDs = req.body.documentIDs;

  const results: string[] = await Promise.all(documentIDs.map(async (id: string): Promise<IReadTracker | null> => {
    const readTracker = new ReadTracker({
      userID: req.body.userID,
      type: 'announcement',
      documentID: id,
      isRead: true
    });

    const createdReadTracker = readTrackerService.saveModel(readTracker);
    return createdReadTracker;
  }));

  if (results) {
    return res.json({success: true, msg: 'Success', results: results});
  }
  return res.status(500).json({success: false, msg: 'Could not read announcements...'});
};
