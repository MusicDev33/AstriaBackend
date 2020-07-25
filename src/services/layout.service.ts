import { ILayout } from '@models/layout.model';
import { Layout } from '@schemas/layout.schema';
import { ModelService } from '@classes/model.service.class';

class LayoutService extends ModelService<ILayout> {
  private static instance: LayoutService;

  private constructor() {
    super(Layout);
  }

  public static getInstance(): LayoutService {
    if (!LayoutService.instance) {
      LayoutService.instance = new LayoutService();
    }

    return LayoutService.instance;
  }
}

const layoutService = LayoutService.getInstance();
export default layoutService;
