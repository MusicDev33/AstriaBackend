import CourseTest from './course.test';
import { courses } from '../testdata/course.data';

const courseTest = new CourseTest();

export class CourseTestDriver {
  async runTests() {
    console.log('Courses - Save Test');
    await courseTest.testSaveCourses(courses);

    console.log('Courses - Get Course Test');
    await courseTest.testGetCourse('courseCode', ['BIOL', 'ECON', 'CHEM2320']);

    console.log('Courses - Clean Up');
    await courseTest.cleanUp();
    console.log('Testing Finished - Courses');
  }
}
