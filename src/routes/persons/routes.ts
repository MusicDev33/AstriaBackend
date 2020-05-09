import express from 'express';
const router = express.Router();
import passport from 'passport';
import * as RouteFunctions from './route.collector';

router.post('/register', RouteFunctions.registerPersonRoute);
router.post('/auth', RouteFunctions.authRoute);
router.post('/auth/request', passport.authenticate('jwt', {session: false}), RouteFunctions.authRequest);

router.post('/add', passport.authenticate('as-admin', {session: false}), RouteFunctions.addPersonRoute);
router.get('/:schoolID/:instructorID/courses', RouteFunctions.getInstructorCoursesRoute);

const PersonRoutes = router;
export default PersonRoutes;
