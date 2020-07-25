import mongoose, { Schema, Model } from 'mongoose';
import { IQuizSubmission } from '@models/quiz-submission.model';

const QuizSubmissionSchema: Schema = new Schema({
	studentID: {type: String, required: true},
	courseID: {type: String, required: true},
	type: {type: String, required: true},
	userAnswers: [{type: String, required: true}],
	correctAnswers: [{type: String, required: true}],
	timeUploaded: {type: Date, required: true},
	lengthOfSession: {type: Number, required: true},
	assignmentID: {type: String, required: true}
},{
	minimize: false
});

export const QuizSubmission: Model<IQuizSubmission> = mongoose.model<IQuizSubmission>('QuizSubmission', QuizSubmissionSchema);
