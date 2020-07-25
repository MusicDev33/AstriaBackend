import { Document } from 'mongoose';

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
