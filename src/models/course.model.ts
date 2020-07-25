import { Document } from 'mongoose';

export interface ICourse extends Document {
  icon: string;
  iconColor: string;
  iconBgColor: string;
  image?: string;
  name: string;
  description: string;
  introText?: string;
  instructors: string[];
  instructorIDs: string[];
  courseCode?: string;
  tags: string[];
  schoolID: string;
  syllabus?: string;
  // Is the course active or has it already ended?
  active: boolean;
}
