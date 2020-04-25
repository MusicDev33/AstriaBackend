import courseService from '@services/course.service';
import { Request, Response } from 'express';
import { Course } from '@models/course.model';

import { LogService } from '@logger/logger';

export const addCourseRoute = async (req: Request, res: Response) => {
  const newCourse = new Course(req.body);

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
