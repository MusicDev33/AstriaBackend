import mongoose, { Schema, Document, Model } from 'mongoose';

import { IQuizAnswer } from '@interfaces/quizanswer.interface';

export interface IQuizQuestion extends Document {
  number: number;
  text: string;
  answers: IQuizAnswer[],
  answered: boolean;
  selectedAnswers: string[];
  points: number;
}

const QuizQuestionSchema: Schema = new Schema({
  number: {type: Number, required: true},
  text: {type: String, required: true},
  answers: [{type: Object, required: true}],
  answered: {type: Boolean, required: true, default: false},
  selectedAnswers: [{type: String, required: false}]
}, {
  minimize: false
});

export const QuizQuestion: Model<IQuizQuestion> = mongoose.model<IQuizQuestion>('QuizQuestion', QuizQuestionSchema);
