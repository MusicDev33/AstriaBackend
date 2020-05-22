import { Course, ICourse } from '@models/course.model';
import { ModelService } from '@classes/model.service.class';

class CourseService extends ModelService<ICourse> {
  private static instance: CourseService;

  private constructor() {
    super(Course);
  }

  public static getInstance(): CourseService {
    if (!CourseService.instance) {
      CourseService.instance = new CourseService();
    }

    return CourseService.instance;
  }
}

const courseService = CourseService.getInstance();
export default courseService;
