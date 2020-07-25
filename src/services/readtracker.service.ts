import { ReadTracker, IReadTracker } from '@models/read-tracker.model';
import { ModelService } from '@classes/model.service.class';

class ReadTrackerService extends ModelService<IReadTracker> {
  private static instance: ReadTrackerService;

  private constructor() {
    super(ReadTracker);
  }

  public static getInstance(): ReadTrackerService {
    if (!ReadTrackerService.instance) {
      ReadTrackerService.instance = new ReadTrackerService();
    }

    return ReadTrackerService.instance;
  }
}

const readTrackerService = ReadTrackerService.getInstance();
export default readTrackerService;
