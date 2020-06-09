import { Request, Response } from 'express';
import { Announcement, IAnnouncement } from '@models/announcement.model';
import announcementService from '@services/announcement.service';
import personService from '@services/person.service';
import enrollmentService from '@services/enrollment.service';

export const getAnnouncementsByParameterRoute = async (req: Request, res: Response) => {
  const sort = {_id: -1};
  const announcements = await announcementService.findModelsByParameter(req.params.param, req.params.value, sort);

  if (announcements) {
    return res.json({success: true, msg: 'Success', announcements: announcements});
  }
  return res.status(500).json({success: false, msg: 'Could not get announcements...'});
};

export const getStudentAnnouncementsRoute = async (req: Request, res: Response) => {
  const sort = {_id: -1};
  const student = await personService.findOneModelByParameter('_id', req.params.studentID);
  if (!student) {
    return res.json({success: true, msg: 'Could not find student!'});
  }

  const query = {
    studentID: String(student._id),
    active: true
  }
  console.log(query);

  const enrollments = await enrollmentService.findModelsByQuery(query);
  if (!enrollments) {
    return res.json({success: true, msg: 'Could not find student enrollments!'});
  }
  console.log(enrollments);
  console.log(student);

  let finalAnnouncementsArray: IAnnouncement[] = [];

  await Promise.all(enrollments.map(async enrollment => {
    console.log(enrollment);
    const response = await Announcement.find({courseID: enrollment.courseID}).exec();
    console.log(response);
    if (response) {
      finalAnnouncementsArray = finalAnnouncementsArray.concat(response);
      return response;
    }
    // Insert error ICourse
    const errorAnnouncement = new Announcement({
      header: 'Error',
      description: 'Could not retrieve announcement',
      author: 'Meteor',
      authorID: 'NA',
      courseID: 'NA',
      time: new Date()
    });
    finalAnnouncementsArray.push(errorAnnouncement)
    return errorAnnouncement;
  }));

  finalAnnouncementsArray.sort((a: IAnnouncement, b: IAnnouncement) => {
    return b.time.getTime() - a.time.getTime();
  });

  return res.json({success: true, msg: 'Found announcements', payload: finalAnnouncementsArray});
};
