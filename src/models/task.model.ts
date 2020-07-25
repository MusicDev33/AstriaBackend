import { Document } from 'mongoose';

export interface ITask extends Document {
  name: string;
  done: boolean;
  studentID: string;
  courseID: string;
  dueDate: Date;
  taskLink?: string;
}
