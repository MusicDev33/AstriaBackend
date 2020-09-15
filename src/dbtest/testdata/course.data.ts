import { Course } from '@schemas/course.schema';

const creditCourse = new Course({
  icon: '<i class="far fa-credit-card"></i>',
  iconColor: 'f500d4',
  iconBgColor: 'ffadf8',
  image: '',
  name: 'Credit in Modern Economics',
  description: 'Learn about how credit works in today\'s economy.',
  instructor: 'Chonkebartu Bargnarg',
  courseCode: 'ECON1400',
  tags: ['test', 'credit', 'economy'],
  schoolID: 'UtahStateUniversity'
});

const hippoCourse = new Course({
  icon: '<i class="fas fa-hippo"></i>',
  iconColor: '00a3f5',
  iconBgColor: 'bde8ff',
  image: '',
  name: 'Hippos and Society',
  description: 'It\'s time for hippos to rise again.',
  instructor: 'Chonkebartu Bargnarg',
  courseCode: 'BIOL5620',
  tags: ['test', 'hippo', 'animals'],
  schoolID: 'UtahStateUniversity'
});

const oChemCourse = new Course({
  icon: '<i class="fas fa-bong"></i>',
  iconColor: '00f56e',
  iconBgColor: 'b2ffd5',
  image: '',
  name: 'Organic Chemistry',
  description: 'Everything you hate about chemistry and more!',
  instructor: 'Brad Davidson',
  courseCode: 'CHEM2320',
  tags: ['test', 'chemistry', 'organic'],
  schoolID: 'UtahStateUniversity'
});

export const courses = [creditCourse, hippoCourse, oChemCourse];
