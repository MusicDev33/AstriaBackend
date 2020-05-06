import express from 'express';
const router = express.Router();
import passport from 'passport';
import * as RouteFunctions from './route.collector';

router.post('/register', RouteFunctions.registerPersonRoute);
router.post('/auth', RouteFunctions.authRoute);
router.get('/auth/request/:scope', passport.authenticate('jwt', {session: false}), RouteFunctions.authRequest);

const PersonRoutes = router;
export default PersonRoutes;
