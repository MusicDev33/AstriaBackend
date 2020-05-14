import express from 'express';
const router = express.Router();
import passport from 'passport';
import * as RouteFunctions from './route.collector';

router.get('/', RouteFunctions.testRoute);
router.get('/course/:schoolID/:instructorID/:courseCode', RouteFunctions.getCourseForInstructorRoute);
router.post('/add', RouteFunctions.addCourseRoute);

const CourseRoutes = router;
export default CourseRoutes;
