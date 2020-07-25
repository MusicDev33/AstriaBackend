import mongoose, { Schema, Model } from 'mongoose';
import { IPerson } from '@models/person.model';

const PersonSchema: Schema = new Schema({
	profileURL: {type: String, required: false},
	name: {type: String, required: true},
	bio: {type: String, required: false},
	schoolID: {type: String, required: true},
	img: {type: String, required: false},
	personType: {type: String, required: true},
	enrolledCourses: [{type: String, required: true}],
	taughtCourses: [{type: String, required: true}],
	email: {type: String, required: true},
	password: {type: String, required: true}
},{
	minimize: false
});

export const Person: Model<IPerson> = mongoose.model<IPerson>('Person', PersonSchema);
