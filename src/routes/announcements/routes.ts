import express from 'express';
const router = express.Router();
import passport from 'passport';
import * as RouteFunctions from './route.collector';

router.get('/param/:param/:value', passport.authenticate('jwt', {session: false}), RouteFunctions.getAnnouncementsByParameterRoute);

router.post('/create', passport.authenticate('jwt', {session: false}), RouteFunctions.createAnnouncementRoute);
// RT = ReadTracker
router.post('/onert/read', passport.authenticate('jwt', {session: false}), RouteFunctions.readOneAnnouncementRoute);
router.post('/rts/read', passport.authenticate('jwt', {session: false}), RouteFunctions.readAnnouncementsRoute);

router.delete('/:id', passport.authenticate('jwt', {session: false}), RouteFunctions.deleteAnnouncementRoute);

const AnnouncementRoutes = router;
export default AnnouncementRoutes;
