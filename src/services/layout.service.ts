import { ILayout } from '@models/layout.model';
import { Layout } from '@schemas/layout.schema';
import { ModelService } from '@classes/model.service.class';
import redisClient from '@config/redis';
import JSONCache from 'redis-json';

const layoutCache = new JSONCache<ILayout>(redisClient, {prefix: 'layoutcache:'});

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
    if (layout._id) {
      const cached = await layoutCache.set(`mt-layout-${layout._id}`, layout);
      if (!cached) {
        return null;
      }

      return layout;
    }

    const newLayout = await this.saveModel(layout);

    if (!newLayout) {
      return null;
    }

    const cached = await layoutCache.set(`mt-layout-${newLayout._id}`, newLayout);
    if (!cached) {
      return null;
    }

    return newLayout;
  }

  public async finalSaveLayout(layout: ILayout): Promise<string> {
    // Remove cached version of layout
    await redisClient.unlink(`mt-layout-${layout._id}`);

    const savedLayout = await this.saveChangedModel(layout, 'objects');

    return savedLayout;
  }
}

const layoutService = LayoutService.getInstance();
export default layoutService;
