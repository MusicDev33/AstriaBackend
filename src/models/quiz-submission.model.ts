import { Document } from 'mongoose';

export interface IQuizSubmission extends Document {
  studentID: string;
  courseID: string;
  type: string;
  userAnswers: string[];
  // A fallback in case scoring is offline
  correctAnswers: string[];
  timeUploaded: Date;
  // How long did it take the user to take the quiz in minutes
  lengthOfSession: number;
  assignmentID: string;
}
