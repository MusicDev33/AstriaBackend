import { Document } from 'mongoose';

// Not sure why this needs to be separate from announcement
export interface IEvent extends Document {
  header: string;
  description: string;
  courseID: string;
  author: string;
  time: Date;
}
