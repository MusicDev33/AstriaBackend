import mongoose, { Schema, Model } from 'mongoose';
import { ISchool } from '@models/school.model';

const SchoolSchema: Schema = new Schema({
	name: {type: String, required: true},
	location: {type: String, required: true},
	asID: {type: String, required: true},
	img: {type: String, required: false}
},{
	minimize: false
});

export const School: Model<ISchool> = mongoose.model<ISchool>('School', SchoolSchema);
