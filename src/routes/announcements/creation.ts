import { Request, Response } from 'express';
import announcementService from '@services/announcement.service';
import { Announcement } from '@models/announcement.model';

export const createAnnouncementRoute = async (req: Request, res: Response) => {
  const newAncmnt = new Announcement(req.body);

  const savedAncmnt = await announcementService.saveModel(newAncmnt);

  if (savedAncmnt) {
    return res.json({success: true, msg: 'Announcement saved successfully.', announcement: savedAncmnt});
  }
  return res.status(500).json({success: false, msg: 'Could not save announcement...'});
};
