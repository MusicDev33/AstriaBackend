import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IAnnouncement extends Document {
  header: string;
  description: string;
  courseID: string;
  author: string;
  time: Date;
}

const AnnouncementSchema: Schema = new Schema({
  header: {type: String, required: true},
  description: {type: String, required: true},
  courseID: {type: String, required: true},
  author: {type: String, required: true},
  time: {type: Date, required: true}
}, {
  minimize: false
});

export const Announcement: Model<IAnnouncement> = mongoose.model<IAnnouncement>('Announcement', AnnouncementSchema);
