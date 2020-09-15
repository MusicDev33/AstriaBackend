import express from 'express';
const router = express.Router();
import * as RouteFunctions from './route.collector';
import { userAuth } from '@config/auth';

router.get('/param/:param/:value', userAuth(), RouteFunctions.getAnnouncementsByParameterRoute);
router.get('/student/:studentID', userAuth(), RouteFunctions.getStudentAnnouncementsRoute);

router.post('/create', userAuth(), RouteFunctions.createAnnouncementRoute);
// RT = ReadTracker
router.post('/onert/read', userAuth(), RouteFunctions.readOneAnnouncementRoute);
router.post('/rts/read', userAuth(), RouteFunctions.readAnnouncementsRoute);

router.delete('/:id', userAuth(), RouteFunctions.deleteAnnouncementRoute);

const AnnouncementRoutes = router;
export default AnnouncementRoutes;
