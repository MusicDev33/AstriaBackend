import express from 'express';
const router = express.Router();
import passport from 'passport';
import * as RouteFunctions from './route.collector';

// TODO: shorten route name
router.post('/create', passport.authenticate('jwt', {session: false}), RouteFunctions.enrollStudentRoute);
router.get('/courses/:studentID', passport.authenticate('jwt', {session: false}), RouteFunctions.getStudentCourseEnrollmentsRoute);

router.get('/:param/:paramValue', passport.authenticate('jwt', {session:false}), RouteFunctions.getCourseEnrollmentsByParamRoute);

const EnrollmentRoutes = router;
export default EnrollmentRoutes;
