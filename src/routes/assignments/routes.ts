import express from 'express';
const router = express.Router();
import passport from 'passport';
import * as RouteFunctions from './route.collector';

const passAuth = passport.authenticate('jwt', {session: false});

router.get('/:assignmentID/layout', passAuth, RouteFunctions.getAssignmentLayoutRoute);

router.post('/:courseID/new', passAuth, RouteFunctions.createAssignmentRoute);
router.post('/:assignmentID/new/submission/:userID', RouteFunctions.createAssignSubmissionRoute);
router.post('/:assignmentID/new/layout', passAuth, RouteFunctions.addAssignmentLayoutRoute);
router.post('/:assignmentID/autosave/layout', passAuth, RouteFunctions.autosaveLayoutRoute);
router.post('/:assignmentID/finalsave/layout', passAuth, RouteFunctions.finalAutosaveLayoutRoute);

const AssignmentRoutes = router;
export default AssignmentRoutes;
