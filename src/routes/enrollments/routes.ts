import express from 'express';
const router = express.Router();
import passport from 'passport';
import * as RouteFunctions from './route.collector';

// TODO: shorten route name
router.post('/:schoolID/:instructorID/:courseID/:studentID/enroll', passport.authenticate('jwt', {session: false}), RouteFunctions.enrollStudentRoute);

const EnrollmentRoutes = router;
export default EnrollmentRoutes;
