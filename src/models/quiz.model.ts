import { Document } from 'mongoose';

import { IQuizQuestion } from '@models/quiz-question.model';

export interface IQuiz extends Document {
  name: string;
  questions: IQuizQuestion[];
  courseID: string;
}
