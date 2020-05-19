// Not sure why this needs to be separate from announcement
export interface IQuizAnswer {
  answerID: string; // a, b, c, d, etc.
  text: string;
  isCorrect: boolean;
  quizID: string;
  quizQuestionNumber: number;
}
