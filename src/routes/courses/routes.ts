import express from 'express';
const router = express.Router();
import * as RouteFunctions from './route.collector';
import { userAuth } from '@config/auth';

router.get('/', RouteFunctions.testRoute);
router.get('/course/:schoolID/:instructorID/:courseCode', userAuth(), RouteFunctions.getCourseForInstructorRoute);
router.get('/course/:courseID/assignments', userAuth(), RouteFunctions.getCourseAssignments);

router.post('/add', userAuth(), RouteFunctions.addCourseRoute);
router.post('/course/:schoolID/:instructorID/:courseCode/:courseParam', userAuth(), RouteFunctions.setCourseParamRoute);

const CourseRoutes = router;
export default CourseRoutes;
