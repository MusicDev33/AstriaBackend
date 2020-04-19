import courseService from '@services/course.service';
import { ICourse } from '@models/course.model';

class CourseTest {
  async testSaveCourses(courses: ICourse[]) {
    for (const course of courses) {
      const saveResult =  await courseService.saveModel(course);
      if (saveResult) {
        continue;
      }
      console.log(`Test Failed: Could not save course: ${course.name}`);
    }
  }

  async testGetCourse(param: string, paramValues: any[]) {
    for (const paramValue of paramValues) {
      const findResult = await courseService.findCoursesByParameter(param, paramValue);
      if (findResult) {
        continue;
      }
      console.log(`Test Failed: Error searching course with value: ${paramValue}`);
    }
  }

  async cleanUp() {
    const cleanedUp = await courseService.deleteAll();
    if (cleanedUp) {
      return;
    }
    console.log('Test Failed: Could not delete all courses');
  }
}

export default CourseTest;
