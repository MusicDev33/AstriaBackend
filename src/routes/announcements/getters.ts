import { Request, Response } from 'express';
import announcementService from '@services/announcement.service';

export const getAnnouncementsByParameterRoute = async (req: Request, res: Response) => {
  const announcements = await announcementService.findModelsByParameter(req.params.param, req.params.value);

  if (announcements) {
    return res.json({success: true, msg: 'Success', announcements: announcements});
  }
  return res.status(500).json({success: false, msg: 'Could not get announcements...'});
};
