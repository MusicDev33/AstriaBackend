import { Document } from 'mongoose';

import { IQuizAnswer } from '@interfaces/quizanswer.interface';

export interface IQuizQuestion extends Document {
  number: number;
  text: string;
  answers: IQuizAnswer[],
  answered: boolean;
  selectedAnswers: string[];
  points: number;
}
