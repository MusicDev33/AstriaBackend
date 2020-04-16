import { Course, ICourse } from '@models/course.model';
import { ModelService } from '@classes/model.service.class';

class CourseService extends ModelService<ICourse> {
  private static instance: CourseService;

  private constructor() {
    super();
  }

  public static getInstance(): CourseService {
    if (!CourseService.instance) {
      CourseService.instance = new CourseService();
    }

    return CourseService.instance;
  }

  public async saveCourse(changedCourse: ICourse, changedParam: string): Promise<string> {
    changedCourse.markModified(changedParam);
    try {
      const savedCourse = await changedCourse.save();
      if (savedCourse) {
        return 'Successfully changed parameter \'' + changedParam + '\'';
      }
      return 'Couldn\'t change param \'' + changedParam + '\' and it\'s totally our fault. Try again?';
    } catch (err) {
      console.log(err);
      return 'Error - Insert error code here';
    }
  }

  public async findOneCourseByParameter(param: string, paramValue: string): Promise<ICourse | null> {
    try {
      const query: any = {};
      query[param] = paramValue;
      const foundCourse = await Course.findOne(query).exec();
      return foundCourse;
    } catch (err) {
      console.log(err);
      return null;
    }
  }

  public async findCoursesByParameter(param: string, paramValue: string, sort: any = {_id: 1}, limit: number = 30): Promise<ICourse[] | null> {
    try {
      const query: any = {};
      query[param] = paramValue;
      const foundCourses = await Course.find(query).sort(sort).limit(limit).exec();
      return foundCourses;
    } catch (err) {
      console.log(err);
      return null;
    }
  }
}

const courseService = CourseService.getInstance();
export default courseService;
