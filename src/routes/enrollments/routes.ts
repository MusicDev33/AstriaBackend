import express from 'express';
const router = express.Router();
import * as RouteFunctions from './route.collector';
import { userAuth } from '@config/auth';

// TODO: shorten route name
router.post('/create', userAuth(), RouteFunctions.enrollStudentRoute);
router.get('/courses/:studentID', userAuth(), RouteFunctions.getStudentCourseEnrollmentsRoute);

router.get('/:param/:paramValue', userAuth(), RouteFunctions.getCourseEnrollmentsByParamRoute);

const EnrollmentRoutes = router;
export default EnrollmentRoutes;
