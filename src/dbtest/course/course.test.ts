import courseService from '@services/course.service';
import { ICourse } from '@models/course.model';

class CourseTest {
  async testSaveCourses(courses: ICourse[]) {
    for (const course of courses) {
      const saveResult =  await courseService.saveModel(course);
      if (saveResult) {
        console.log(`Successfully saved course: ${saveResult.name}`);
        continue;
      }
      console.log(`Could not save course: ${course.name}`);
    }
  }

  async testGetCourse(param: string, paramValues: any[]) {
    for (const paramValue of paramValues) {
      const findResult = await courseService.findCoursesByParameter(param, paramValue);
      if (findResult) {
        console.log(`Found ${findResult.length} course(s) with a '${param}' of '${paramValue}'`);
        continue;
      }
      console.log(`Error searching course with value: ${paramValue}`);
    }
  }

  async cleanUp() {
    const cleanedUp = await courseService.deleteAll();
    if (cleanedUp) {
      console.log('Successfully deleted all courses');
      return;
    }
    console.log('Could not delete all courses');
  }
}

export default CourseTest;
