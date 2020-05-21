import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IReadTracker extends Document {
  userID: string;
  type: string;
  documentID: string;
  isRead: boolean;
}

const ReadTrackerSchema: Schema = new Schema({
  userID: {type: String, required: true},
  type: {type: String, required: true},
  documentID: {type: String, required: true},
  isRead: {type: Boolean, required: true}
}, {
  minimize: false
});

export const ReadTracker: Model<IReadTracker> = mongoose.model<IReadTracker>('ReadTracker', ReadTrackerSchema);
