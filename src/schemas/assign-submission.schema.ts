import mongoose, { Schema, Model } from 'mongoose';
import { IAssignSubmission } from '@models/assign-submission.model';

const AssignSubmissionSchema: Schema = new Schema({
	objects: {type: Object, required: true},
	assignmentID: {type: String, required: true},
	userID: {type: String, required: true},
	timeSubmitted: {type: Date, required: true},
	autosaved: {type: Boolean, required: true}
},{
	minimize: false, 
	strict: false
});

export const AssignSubmission: Model<IAssignSubmission> = mongoose.model<IAssignSubmission>('AssignSubmission', AssignSubmissionSchema);
