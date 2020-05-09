import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IPerson extends Document {
  profileURL: string;
  name: string;
  bio: string;
  schoolID: string;
  img: string;
  // personType - Instructor, Student, etc.
  personType: string;
  enrolledCourses: string[];
  taughtCourses: string[];
  email: string;
  password: string;
}

const PersonSchema: Schema = new Schema({
  profileURL: {type: String, required: false},
  name: {type: String, required: true},
  bio: {type: String, required: false},
  schoolID: {type: String, required: true},
  img: {type: String, required: false},
  personType: {type: String, required: true},
  enrolledCourses: {type: Array, required: true},
  taughtCourses: {type: Array, required: true},
  email: {type: String, required: true},
  password: {type: String, required: true}
}, {
  minimize: false
});

export const Person: Model<IPerson> = mongoose.model<IPerson>('Person', PersonSchema);
