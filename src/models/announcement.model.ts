import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IAnnouncement extends Document {
  header: string;
  description: string;
  courseID: string;
  author: string;
  authorID: string;
  time: Date;
  icon: string;
  iconColor: string;
  iconBgColor: string;
}

const AnnouncementSchema: Schema = new Schema({
  header: {type: String, required: true},
  description: {type: String, required: true},
  courseID: {type: String, required: true},
  author: {type: String, required: true},
  authorID: {type: String, required: true},
  time: {type: Date, required: true},
  icon: {type: String, required: true},
  iconColor: {type: String, required: true},
  iconBgColor: {type: String, required: true}
}, {
  minimize: false
});

export const Announcement: Model<IAnnouncement> = mongoose.model<IAnnouncement>('Announcement', AnnouncementSchema);
