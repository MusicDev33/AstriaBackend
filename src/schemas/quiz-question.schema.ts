import mongoose, { Schema, Model } from 'mongoose';
import { IQuizQuestion } from '@models/quiz-question.model';

const QuizQuestionSchema: Schema = new Schema({
	number: {type: Number, required: true},
	text: {type: String, required: true},
	answers: [{type: Object, required: true}],
	answered: {type: Boolean, required: true},
	selectedAnswers: [{type: String, required: true}],
	points: {type: Number, required: true}
},{
	minimize: false
});

export const QuizQuestion: Model<IQuizQuestion> = mongoose.model<IQuizQuestion>('QuizQuestion', QuizQuestionSchema);
