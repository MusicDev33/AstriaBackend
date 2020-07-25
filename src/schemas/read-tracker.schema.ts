import mongoose, { Schema, Model } from 'mongoose';
import { IReadTracker } from '@models/read-tracker.model';

const ReadTrackerSchema: Schema = new Schema({
	userID: {type: String, required: true},
	type: {type: String, required: true},
	documentID: {type: String, required: true},
	isRead: {type: Boolean, required: true}
},{
	minimize: false
});

export const ReadTracker: Model<IReadTracker> = mongoose.model<IReadTracker>('ReadTracker', ReadTrackerSchema);
