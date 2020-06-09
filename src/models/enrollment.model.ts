import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IEnrollment extends Document {
  studentID: string;
  courseID: string;
  schoolID: string;
  studentName: string;
  active: boolean;
}

const EnrollmentSchema: Schema = new Schema({
  studentID: {type: String, required: true},
  courseID: {type: String, required: true},
  schoolID: {type: String, required: true},
  studentName: {type: String, required: true},
  active: {type: Boolean, required: true}
}, {
  minimize: false
});

export const Enrollment: Model<IEnrollment> = mongoose.model<IEnrollment>('Enrollment', EnrollmentSchema);
