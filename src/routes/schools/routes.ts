import express from 'express';
const router = express.Router();
import * as RouteFunctions from './route.collector';
import { userAuth } from '@config/auth';

router.post('/add', userAuth(0), RouteFunctions.addSchoolRoute);
router.get('/', userAuth(0), RouteFunctions.getAllSchoolsRoute);

router.get('/:schoolID/:profileURL/courses', RouteFunctions.getInstructorCoursesRoute);
router.get('/:schoolID/instructors', RouteFunctions.getSchoolInstructorsRoute);

const SchoolRoutes = router;
export default SchoolRoutes;
