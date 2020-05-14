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

  public async saveChangedCourse(changedCourse: ICourse, changedParam: string): Promise<string> {
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

  public async findOneCourseByParameter(param: string, paramValue: any): Promise<ICourse | null> {
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

  public async findCoursesByParameter(param: string, paramValue: any, sort: any = {_id: 1}, limit: number = 30): Promise<ICourse[] | null> {
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

  public async findCoursesByQuery(query: any, sort: any = {_id: 1}, limit: number = 30): Promise<ICourse[] | null> {
    try {
      const foundCourses = await Course.find(query).sort(sort).limit(limit).exec();
      return foundCourses;
    } catch (err) {
      console.log(err);
      return null;
    }
  }

  public async findOneCourseByQuery(query: any, sort: any = {_id: 1}, limit: number = 30): Promise<ICourse | null> {
    try {
      const foundCourse = await Course.findOne(query).sort(sort).limit(limit).exec();
      return foundCourse;
    } catch (err) {
      console.log(err);
      return null;
    }
  }

  // Still not sure what the best way to semantically to type this is
  public async deleteAll(): Promise<any | null> {
    try {
      const deletedAllCourses = await Course.deleteMany({}).exec();
      return deletedAllCourses;
    } catch (err) {
      console.log(err);
      return null;
    }
  }
}

const courseService = CourseService.getInstance();
export default courseService;
