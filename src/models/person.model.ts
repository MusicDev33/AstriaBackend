import { Document } from 'mongoose';

export interface IPerson extends Document {
  profileURL?: string;
  name: string;
  bio?: string;
  schoolID: string;
  img?: string;
  // personType - Instructor, Student, etc.
  personType: string;
  enrolledCourses: string[];
  taughtCourses: string[];
  email: string;
  password: string;
}
