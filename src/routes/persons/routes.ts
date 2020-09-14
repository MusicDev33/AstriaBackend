import express from 'express';
const router = express.Router();
import passport from 'passport';
import * as RouteFunctions from './route.collector';

import { userAuth } from '@config/auth';

router.post('/register', RouteFunctions.registerPersonRoute);
router.post('/auth', RouteFunctions.authRoute);
router.post('/auth/request', userAuth(), RouteFunctions.authRequest);

router.post('/add', passport.authenticate('mt-admin', {session: false}), RouteFunctions.addPersonRoute);
router.get('/:schoolID/:instructorID/courses', RouteFunctions.getInstructorCoursesRoute);

const PersonRoutes = router;
export default PersonRoutes;
