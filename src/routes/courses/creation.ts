import { Request, Response } from 'express';
import courseService from '@services/course.service';
import { Course } from '@models/course.model';

import { generateCourseID } from '@utils/courseid.generator';

import { LogService } from '@logger/logger';

export const addCourseRoute = async (req: Request, res: Response) => {
  const newCourse = new Course(req.body);

  newCourse.courseCode = generateCourseID(newCourse.name);

  const query = {$or: [ {'courseCode': newCourse.courseCode}, {'name': newCourse.name} ]}
  const courseExists = await courseService.findModelsByQuery(query);

  if (courseExists && courseExists.length) {
    return res.json({success: false, msg: 'Course already exists!'});
  }

  const savedCourse = await courseService.saveModel(newCourse);
  if (savedCourse) {
    return res.json({success: true, msg: 'Successfully added course'});
  } else {
    return res.json({success: false, msg: 'Could not add course...'});
  }
};

export const testRoute = (req: Request, res: Response) => {
  LogService.log('info', 'test');
  return res.send('<h1 style="color: #ca02d1;">SEND</h1>');
}
