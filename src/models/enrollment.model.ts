import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IEnrollment extends Document {
  studentID: string;
  courseID: string;
  schoolID: string;
  instructorID: string;
}

const EnrollmentSchema: Schema = new Schema({
  studentID: {type: String, required: true},
  courseID: {type: String, required: true},
  schoolID: {type: String, required: true},
  instructorID: {type: String, required: true}
}, {
  minimize: false
});

export const Enrollment: Model<IEnrollment> = mongoose.model<IEnrollment>('Enrollment', EnrollmentSchema);
