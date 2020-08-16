import express from 'express';
const router = express.Router();
import passport from 'passport';
import * as RouteFunctions from './route.collector';

const passAuth = passport.authenticate('jwt', {session: false});

router.get('/', RouteFunctions.testRoute);
router.get('/course/:schoolID/:instructorID/:courseCode', passAuth, RouteFunctions.getCourseForInstructorRoute);
router.get('/course/:courseID/assignments', passAuth, RouteFunctions.getCourseAssignments);

router.post('/add', passAuth, RouteFunctions.addCourseRoute);
router.post('/course/:schoolID/:instructorID/:courseCode/:courseParam', passAuth, RouteFunctions.setCourseParamRoute);

const CourseRoutes = router;
export default CourseRoutes;
