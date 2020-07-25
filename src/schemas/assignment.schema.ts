import mongoose, { Schema, Model } from 'mongoose';
import { IAssignment } from '@models/assignment.model';

const AssignmentSchema: Schema = new Schema({
	name: {type: String, required: true},
	openDate: {type: Date, required: true},
	dueDate: {type: Date, required: true},
	closeDate: {type: Date, required: true},
	description: {type: String, required: false},
	type: {type: String, required: true},
	allowedFileExtensions: [{type: String, required: false}],
	points: {type: Number, required: false},
	courseID: {type: String, required: true},
	graded: {type: Boolean, required: true},
	layoutID: {type: String, required: false},
},{
	minimize: false, 
	strict: false
});

export const Assignment: Model<IAssignment> = mongoose.model<IAssignment>('Assignment', AssignmentSchema);
