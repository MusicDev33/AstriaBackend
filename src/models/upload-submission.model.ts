import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IUploadSubmission extends Document {
  studentID: string;
  courseID: string;
  type: string;
  uploadUrls: string[];
  timeUploaded: Date;
  assignmentID: string;
}

const UploadSubmissionSchema: Schema = new Schema({
  studentID: {type: String, required: true},
  courseID: {type: String, required: true},
  type: {type: String, required: true},
  uploadedUrls: [{type: String, required: true}],
  timeUploaded: {type: Date, required: true},
  assignmentID: {type: String, required: true}
}, {
  minimize: false
});

export const UploadSubmission: Model<IUploadSubmission> = mongoose.model<IUploadSubmission>('UploadSubmission', UploadSubmissionSchema);
