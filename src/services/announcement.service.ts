import { Announcement, IAnnouncement } from '@models/announcement.model';
import { ModelService } from '@classes/model.service.class';

class AnnouncementService extends ModelService<IAnnouncement> {
  private static instance: AnnouncementService;

  bannedParams = ['header', 'description'];

  private constructor() {
    super(Announcement);
  }

  public static getInstance(): AnnouncementService {
    if (!AnnouncementService.instance) {
      AnnouncementService.instance = new AnnouncementService();
    }

    return AnnouncementService.instance;
  }
}

const announcementService = AnnouncementService.getInstance();
export default announcementService;
