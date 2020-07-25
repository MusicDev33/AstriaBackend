import mongoose, { Schema, Document, Model } from 'mongoose';

export interface ILayout extends Document {
  nonStrict?: boolean;
}

const LayoutSchema: Schema = new Schema({

}, {
  minimize: false,
  strict: false
});

export const Layout: Model<ILayout> = mongoose.model<ILayout>('Layout', LayoutSchema);
