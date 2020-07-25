import { IEvent } from '@models/event.model';
import { Event } from '@schemas/event.schema';
import { ModelService } from '@classes/model.service.class';

class EventService extends ModelService<IEvent> {
  private static instance: EventService;

  private constructor() {
    super(Event);
  }

  public static getInstance(): EventService {
    if (!EventService.instance) {
      EventService.instance = new EventService();
    }

    return EventService.instance;
  }
}

const eventService = EventService.getInstance();
export default eventService;
