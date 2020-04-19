import express from 'express';
const router = express.Router();
import passport from 'passport';
import * as RouteFunctions from './route.collector';

router.post('/add', RouteFunctions.addPersonRoute);

const PersonRoutes = router;
export default PersonRoutes;
