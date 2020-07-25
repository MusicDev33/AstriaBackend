import { IQuiz } from '@models/quiz.model';
import { Quiz } from '@schemas/quiz.schema';
import { ModelService } from '@classes/model.service.class';

class QuizService extends ModelService<IQuiz> {
  private static instance: QuizService;

  private constructor() {
    super(Quiz);
  }

  public static getInstance(): QuizService {
    if (!QuizService.instance) {
      QuizService.instance = new QuizService();
    }

    return QuizService.instance;
  }
}

const quizService = QuizService.getInstance();
export default quizService;
