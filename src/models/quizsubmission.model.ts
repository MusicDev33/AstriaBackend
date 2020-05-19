import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IQuizSubmission extends Document {
  studentID: string;
  courseID: string;
  type: string;
  userAnswers: string[];
  // A fallback in case scoring is offline
  correctAnswers: string[];
  timeUploaded: Date;
  // How long did it take the user to take the quiz in minutes
  lengthOfSession: number;
  assignmentID: string;
}

const QuizSubmissionSchema: Schema = new Schema({
  studentID: {type: String, required: true},
  courseID: {type: String, required: true},
  type: {type: String, required: true},
  userAnswers: [{type: String, required: true}],
  correctAnswers: [{type: String, required: true}],
  timeUploaded: {type: Date, required: true},
  lengthOfSession: {type: Number, required: true},
  assignmentID: {type: String, required: true}
}, {
  minimize: false
});

export const QuizSubmission: Model<IQuizSubmission> = mongoose.model<IQuizSubmission>('QuizSubmission', QuizSubmissionSchema);
