import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IPerson extends Document {
  profileURL: string;
  name: string;
  bio: string;
  schoolID: string;
  // personType - Instructor, Student, etc.
  personType: string;
  enrolledCourses: string[];
  taughtCourses: string[];
}

const PersonSchema: Schema = new Schema({
  profileURL: {type: String, required: true},
  name: {type: String, required: true},
  bio: {type: String, required: true},
  schoolID: {type: String, required: true},
  personType: {type: String, required: true},
  enrolledCourses: {type: Array, required: true},
  taughtCourses: {type: Array, required: true}
}, {
  minimize: false
});

export const Person: Model<IPerson> = mongoose.model<IPerson>('Person', PersonSchema);
