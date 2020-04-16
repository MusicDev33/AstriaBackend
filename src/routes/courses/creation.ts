import courseService from '@services/course.service';
import { Request, Response } from 'express';
import { Course } from '@models/course.model';

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
  return res.send('<h1 style="color: #ca02d1;">SEND</h1>');
}
