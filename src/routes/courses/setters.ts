import courseService from '@services/course.service';
import { Request, Response } from 'express';

export const setCourseParamRoute = async (req: Request, res: Response) => {
  const query = {
    courseCode: req.params.courseCode,
    schoolID: req.params.schoolID,
    instructorIDs: req.params.instructorID
  }

  const foundCourse: any = await courseService.findOneModelByQuery(query);

  if (!foundCourse) {
    return res.json({success: false, msg: 'Could not find courses...'});
  }

  console.log(foundCourse)
  console.log(req.params.courseParam)
  console.log(foundCourse[req.params.courseParam])

  foundCourse[req.params.courseParam] = req.body.paramValue;
  const savedCourse = await courseService.saveChangedModel(foundCourse, req.params.courseParam);

  if (savedCourse) {
    return res.json({success: true, msg: 'Successfully saved course!'})
  }

  return res.json({success: false, msg: '500 Error - Something happened on Meteor\'s end...'});
}
