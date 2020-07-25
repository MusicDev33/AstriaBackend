import mongoose, { Schema, Model } from 'mongoose';
import { ILayout } from '@models/layout.model';

const LayoutSchema: Schema = new Schema({
},{
	minimize: false, 
	strict: false
});

export const Layout: Model<ILayout> = mongoose.model<ILayout>('Layout', LayoutSchema);
