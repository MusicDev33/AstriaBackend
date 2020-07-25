import mongoose, { Schema, Model } from 'mongoose';
import { IQuiz } from '@models/quiz.model';

const QuizSchema: Schema = new Schema({
	name: {type: String, required: true},
	questions: [{type: IQuizQuestion, required: true}],
	courseID: {type: String, required: true}
},{
	minimize: false
});

export const Quiz: Model<IQuiz> = mongoose.model<IQuiz>('Quiz', QuizSchema);
