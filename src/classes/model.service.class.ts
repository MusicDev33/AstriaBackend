import { Document } from 'mongoose';

export class ModelService<P extends Document> {
  public async saveModel(newModel: P): Promise<P | null> {
    try {
      const savedModel = await newModel.save();
      return savedModel;
    } catch (err) {
      console.log(err);
      return null;
    }
  }
}
