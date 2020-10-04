import express from 'express';
const router = express.Router();
import * as RouteFunctions from './route.collector';
import { userAuth } from '@config/auth';

router.get('/:assignmentID/layout', userAuth(), RouteFunctions.getAssignmentLayoutRoute);
router.get('/:assignmentID/submission/:userID', userAuth(), RouteFunctions.getSubmissionRoute);
router.get('/submission/:userID', userAuth(), RouteFunctions.getClassSubmissionsRoute);

router.post('/:courseID/new', userAuth(), RouteFunctions.createAssignmentRoute);
router.post('/:assignmentID/new/submission/:userID', RouteFunctions.createAssignSubmissionRoute);
router.post('/:assignmentID/new/layout', userAuth(), RouteFunctions.addAssignmentLayoutRoute);
router.post('/:assignmentID/autosave/layout', userAuth(), RouteFunctions.autosaveLayoutRoute);
router.post('/:assignmentID/finalsave/layout', userAuth(), RouteFunctions.finalAutosaveLayoutRoute);
router.post('/:assignmentID/autosave/submission/:userID', userAuth(), RouteFunctions.autosaveSubmissionRoute);

const AssignmentRoutes = router;
export default AssignmentRoutes;
