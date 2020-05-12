import mongoose, { Schema, Document, Model } from 'mongoose';

export interface ICourse extends Document {
  icon: string;
  iconColor: string;
  iconBgColor: string;
  image: string;
  name: string;
  description: string;
  instructors: string[];
  instructorIDs: string[];
  courseCode: string;
  tags: string[];
  schoolID: string;
}

const CourseSchema: Schema = new Schema({
  icon: {type: String, required: true},
  iconColor: {type: String, required: true},
  iconBgColor: {type: String, required: true},
  image: {type: String, required: false},
  name: {type: String, required: true},
  description: {type: String, required: true},
  instructors: {type: Array, required: true},
  instructorIDs: {type: Array, required: true},
  courseCode: {type: String, required: false},
  tags: {type: Array, required: true},
  schoolID: {type: String, required: true}
}, {
  minimize: false
});

export const Course: Model<ICourse> = mongoose.model<ICourse>('Course', CourseSchema);
