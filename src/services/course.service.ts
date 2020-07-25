import { ICourse } from '@models/course.model';
import { Course } from '@schemas/course.schema';
import { IEnrollment }  from '@models/enrollment.model';
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

  public async getEnrolledCourses(enrollments: IEnrollment[]): Promise<ICourse[]> {
    const courseArray = enrollments.map(async enrollment => {
      const response = await Course.findOne({_id: enrollment.courseID}).exec();
      if (response) {
        return response;
      }
      // Insert error ICourse
      const errorCourse = new Course({
        icon: '<i class="fas fa-exclamation"></i>',
        iconColor: '#ed472a',
        iconBgColor: '#ff826c',
        image: '',
        name: 'Error',
        description: 'This course had an error on retrieval',
        introText: '',
        instructors: ['ErrorBot'],
        instructorIDs: ['errorbot'],
        courseCode: 'error-course',
        tags: [],
        schoolID: 'meteorlms',
        syllabus: 'This course is useless',
        active: true
      });

      return errorCourse;
    });

    return await Promise.all(courseArray);
  }
}

const courseService = CourseService.getInstance();
export default courseService;
