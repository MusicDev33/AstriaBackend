import { Document } from 'mongoose';

export interface IUploadSubmission extends Document {
  studentID: string;
  courseID: string;
  type: string;
  uploadUrls: string[];
  timeUploaded: Date;
  assignmentID: string;
}
