import { Request, Response } from 'express';
import announcementService from '@services/announcement.service';

export const deleteAnnouncementRoute = async (req: Request, res: Response) => {
  const ancmntID = req.params.id;
  const removedAncmnt = await announcementService.removeOneModelByParameter('_id', ancmntID);

  if (removedAncmnt) {
    return res.json({success: true, msg: 'Announcement removed successfully.', announcement: removedAncmnt});
  }
  return res.status(500).json({success: false, msg: 'Could not remove announcement...'});
};
