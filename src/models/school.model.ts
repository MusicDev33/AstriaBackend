import mongoose, { Schema, Document, Model } from 'mongoose';

export interface ISchool extends Document {
  name: string;
  location: string;
  asID: string;
  img: string;
}

const SchoolSchema: Schema = new Schema({
  name: {type: String, required: true, unique: true},
  location: {type: String, required: true, unique: true},
  asID: {type: String, required: true, unique: true},
  img: {type: String, required: false}
}, {
  minimize: false
});

export const School: Model<ISchool> = mongoose.model<ISchool>('School', SchoolSchema);
