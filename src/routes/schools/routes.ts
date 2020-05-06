import express from 'express';
const router = express.Router();
import passport from 'passport';
import * as RouteFunctions from './route.collector';

router.post('/add', passport.authenticate('as-admin', {session: false}), RouteFunctions.addSchoolRoute);
router.get('/', passport.authenticate('as-admin', {session: false}), RouteFunctions.getAllSchoolsRoute);

const SchoolRoutes = router;
export default SchoolRoutes;
