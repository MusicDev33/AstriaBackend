import mongoose, { Schema, Document, Model } from 'mongoose';

export interface ICourse extends Document {
  icon: string;
  iconColor: string;
  iconBgColor: string;
  image: string;
  name: string;
  description: string;
  instructor: string;
  courseCode: string;
  tags: string[];
  schoolID: string;
}

const CourseSchema: Schema = new Schema({
  icon: {type: String, required: true},
  iconColor: {type: String, required: true},
  iconBgColor: {type: String, required: true},
  image: {type: String, required: true},
  name: {type: String, required: true},
  description: {type: String, required: true},
  instructor: {type: String, required: true},
  courseCode: {type: String, required: true},
  tags: {type: String, required: true},
  schoolID: {type: String, required: true}
}, {
  minimize: false
});

export const Course: Model<ICourse> = mongoose.model<ICourse>('Course', CourseSchema);