import mongoose, { Schema, Document, Model } from 'mongoose';

import { IQuizQuestion } from '@models/quizquestion.model';

export interface IQuiz extends Document {
  name: string;
  questions: IQuizQuestion[];
  courseID: string;
}

const QuizSchema: Schema = new Schema({
  name: {type: String, required: true, unique: false},
  questions: [{type: Object, required: true}],
  courseID: {type: String, required: true}
}, {
  minimize: false
});

export const Quiz: Model<IQuiz> = mongoose.model<IQuiz>('Quiz', QuizSchema);
