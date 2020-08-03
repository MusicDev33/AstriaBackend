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

  // We're constantly caching the layout for autosaving.
  // Their small size makes Redis more efficient when we're constantly
  // making writes.
  public async autosaveLayout(layout: ILayout): Promise<ILayout | null> {
    // Just have to make sure we get the exact copy of the object
    let layoutInDB = await layoutService.findOneModelByParameter('_id', layout._id);
    if (!layoutInDB) {
      return null;
    }

    layoutInDB.objects = layout.objects;
    const autosaved = await layoutService.saveChangedModel(layoutInDB, 'objects');
    if (!autosaved) {
      return null;
    }

    return layout;
  }

  public async finalSaveLayout(layout: ILayout): Promise<string> {
    const savedLayout = await this.saveChangedModel(layout, 'objects');

    return savedLayout;
  }
}

const layoutService = LayoutService.getInstance();
export default layoutService;
