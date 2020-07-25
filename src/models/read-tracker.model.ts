import { Document } from 'mongoose';

export interface IReadTracker extends Document {
  userID: string;
  type: string;
  documentID: string;
  isRead: boolean;
}
