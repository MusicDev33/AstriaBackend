import express from 'express';
const router = express.Router();
import * as RouteFunctions from './route.collector';

import { userAuth } from '@config/auth';

router.post('/register', RouteFunctions.registerPersonRoute);
router.post('/auth', RouteFunctions.authRoute);
router.post('/auth/request', userAuth(), RouteFunctions.authRequest);

router.post('/add', userAuth(0), RouteFunctions.addPersonRoute);
router.get('/:schoolID/:instructorID/courses', RouteFunctions.getInstructorCoursesRoute);

const PersonRoutes = router;
export default PersonRoutes;
