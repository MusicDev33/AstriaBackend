import express from 'express';
const router = express.Router();
import passport from 'passport';
import * as RouteFunctions from './route.collector';

router.post('/register', RouteFunctions.registerPersonRoute);
router.post('/auth', RouteFunctions.authRoute);

const PersonRoutes = router;
export default PersonRoutes;
