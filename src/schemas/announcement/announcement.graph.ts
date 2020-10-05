import { AnnouncementTC } from './announcement.schema';

const AnnouncementQuery = {
  announcementByID: AnnouncementTC.getResolver('findById'),
  announcementByIDs: AnnouncementTC.getResolver('findByIds'),
  announcementOne: AnnouncementTC.getResolver('findOne'),
  announcementMany: AnnouncementTC.getResolver('findMany')
}

export { AnnouncementQuery }; 
