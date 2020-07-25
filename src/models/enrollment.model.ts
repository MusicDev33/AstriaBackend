import { Document } from 'mongoose';

export interface IEnrollment extends Document {
  studentID: string;
  courseID: string;
  schoolID: string;
  studentName: string;
  active: boolean;
}
