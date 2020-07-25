import mongoose, { Schema, Model } from 'mongoose';
import { ICourse } from '@models/course.model';

const CourseSchema: Schema = new Schema({
	icon: {type: String, required: true},
	iconColor: {type: String, required: true},
	iconBgColor: {type: String, required: true},
	image: {type: String, required: false},
	name: {type: String, required: true},
	description: {type: String, required: true},
	introText: {type: String, required: false},
	instructors: [{type: String, required: true}],
	instructorIDs: [{type: String, required: true}],
	courseCode: {type: String, required: false},
	tags: [{type: String, required: true}],
	schoolID: {type: String, required: true},
	syllabus: {type: String, required: false},
	active: {type: Boolean, required: true}
},{
	minimize: false
});

export const Course: Model<ICourse> = mongoose.model<ICourse>('Course', CourseSchema);
