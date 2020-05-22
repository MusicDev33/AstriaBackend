import express from 'express';
const router = express.Router();
import passport from 'passport';
import * as RouteFunctions from './route.collector';

router.post('/create', passport.authenticate('jwt', {session: false}), RouteFunctions.createAnnouncementRoute);

const AnnouncementRoutes = router;
export default AnnouncementRoutes;
