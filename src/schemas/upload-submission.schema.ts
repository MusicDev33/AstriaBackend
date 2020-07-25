import mongoose, { Schema, Model } from 'mongoose';
import { IUploadSubmission } from '@models/upload-submission.model';

const UploadSubmissionSchema: Schema = new Schema({
	studentID: {type: String, required: true},
	courseID: {type: String, required: true},
	type: {type: String, required: true},
	uploadUrls: [{type: String, required: true}],
	timeUploaded: {type: Date, required: true},
	assignmentID: {type: String, required: true}
},{
	minimize: false
});

export const UploadSubmission: Model<IUploadSubmission> = mongoose.model<IUploadSubmission>('UploadSubmission', UploadSubmissionSchema);
