import express from 'express';
const router = express.Router();
import passport from 'passport';
import * as RouteFunctions from './route.collector';

router.post('/:courseID/new', passport.authenticate('jwt', {session: false}), RouteFunctions.createAssignmentRoute);
router.post('/:assignmentID/new/layout', passport.authenticate('jwt', {session: false}), RouteFunctions.addAssignmentLayoutRoute);
