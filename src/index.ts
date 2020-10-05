// tslint:disable-next-line
require('tsconfig-paths/register');
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import helmet from 'helmet';
import mongoose from 'mongoose';

import { acceptedAgents } from '@config/constants';
import * as RoutesLib from '@config/route-defs';
import { validateVitalEnv } from '@validate/env.validate';

// const rustAddons = require('../native');

import { Request, Response } from 'express';
dotenv.config();
require('dotenv-defaults/config');

// CONSTANTS
const DB_SECRET = validateVitalEnv(process.env.DB_SECRET);
const DB_URI = validateVitalEnv(process.env.DB_URI);
const PORT = validateVitalEnv(process.env.API_PORT);
const BASE_URL = validateVitalEnv(process.env.API_URL_BASE);

// TWILIO
if (process.env.NODE_ENV === 'PRODUCTION') {
  const client = require('twilio')(process.env.TWILSID, process.env.TWILAUTH);
  client.messages.create({
       body: 'Hey! Your server restarted for some reason!',
       from: '+12057549322',
       to: process.env.TESTPHONE
  }).then((message: any) => console.log(message.sid));
}

mongoose.connect(DB_URI, {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

mongoose.connection.on('connected', () => {
  console.log('Database Connected: ' + DB_URI);
});

mongoose.connection.on('error', (err: any) => {
  console.log('Database Error: ' + err);
});

// Create Express instance
const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(cookieParser());

app.use(helmet());
app.disable('x-powered-by');
app.set('trust proxy', 1);

const whitelist = ['https://demo.meteorlms.com', 'https://meteorlms.com', 'https://asapi.inquantir.com']
const corsOptions = {
  credentials: true,
  origin: (origin: any, callback: any) => {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(null, true);
    }
  }
}

app.options('*', cors(corsOptions));

app.use(cors(corsOptions));

// Check IQ-User-Agent
const checkAgent = (req: Request, res: Response, next: any) => {
  const agent = req.header('AS-User-Agent') as string;
  if (acceptedAgents.indexOf(agent) <= -1) {
    const resText = '<h1>404 - Here\'s a cool picture of Blaziken and Lucario:<br><br>';
    const resImg = '<img src="https://pm1.narvii.com/6179/5434c40be48978d53a89c43c581bb0d84d1a4c56_hq.jpg">';
    res.status(404).send(resText + resImg);
  }
  next();
};

// app.use(checkAgent);

// Routes

app.use(BASE_URL + 'courses', RoutesLib.CourseRoutes);
app.use(BASE_URL + 'persons', RoutesLib.PersonRoutes);
app.use(BASE_URL + 'schools', RoutesLib.SchoolRoutes);
app.use(BASE_URL + 'announcements', RoutesLib.AnnouncementRoutes);
app.use(BASE_URL + 'enrollments', RoutesLib.EnrollmentRoutes);
app.use(BASE_URL + 'assignments', RoutesLib.AssignmentRoutes);

// create public folder with the index.html when finished
// app.use(express.static(path.join(__dirname, 'public')));
console.log(BASE_URL);
app.get(BASE_URL, (_, res: Response) => {
  console.log(`Test API Base: ${BASE_URL}`);
  const resText = '<h1>404 - Here\'s a cool picture of Blaziken and Lucario:<br><br>';
  const resImg = '<img src="https://pm1.narvii.com/6179/5434c40be48978d53a89c43c581bb0d84d1a4c56_hq.jpg">';
  res.status(404).send(resText + resImg);
});

app.get('', (_, res: Response) => {
  console.log('Test Blank');
  const resText = '<h1>404 - Here\'s a cool picture of Blaziken and Lucario:<br><br>';
  const resImg = '<img src="https://pm1.narvii.com/6179/5434c40be48978d53a89c43c581bb0d84d1a4c56_hq.jpg">';
  res.status(404).send(resText + resImg);
});

app.listen(PORT, () => {
  console.log('\nAstria Backend started in mode \'' + process.env.NODE_ENV + '\'');
  if (process.env.NODE_ENV === 'PRODUCTION' || process.env.NODE_ENV === 'DEVTEST') {
    console.log('TLS/HTTPS is on.');
  } else {
    console.log('TLS/HTTPS is off.');
  }
  console.log('Port: ' + PORT);
});
