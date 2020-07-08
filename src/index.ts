// tslint:disable-next-line
require('tsconfig-paths/register');
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import fs from 'fs';
import helmet from 'helmet';
import https from 'https';
import mongoose from 'mongoose';
import passport from 'passport';
import path from 'path';

import { dbConfig } from '@config/database';
import { port, apiBase, acceptedAgents } from './config/constants';
import * as RoutesLib from '@config/route-defs';

// const rustAddons = require('../native');

import { userPassportAuth, adminPassportAuth, asAdminStrategy } from '@config/passport';

import { Request, Response } from 'express';
dotenv.config();
require('dotenv-defaults/config');

// TWILIO
if (process.env.NODE_ENV === 'PRODUCTION') {
  const client = require('twilio')(process.env.TWILSID, process.env.TWILAUTH);
  client.messages.create({
       body: 'Hey! Your server restarted for some reason!',
       from: '+12057549322',
       to: process.env.TESTPHONE
  }).then((message: any) => console.log(message.sid));
}

let credentials: {key: string, cert: string} = {key: '', cert: ''};

if (process.env.NODE_ENV === 'PRODUCTION' || process.env.NODE_ENV === 'DEVTEST') {
  const privateKey  = fs.readFileSync('/etc/letsencrypt/live/meteorlms.com/privkey.pem', 'utf8');
  const certificate = fs.readFileSync('/etc/letsencrypt/live/meteorlms.com/cert.pem', 'utf8');

  credentials = {key: privateKey, cert: certificate};
}

mongoose.connect(dbConfig.database, {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

mongoose.connection.on('connected', () => {
  console.log('Database Connected: ' + dbConfig.database);
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

// Allows other domains to use this domain as an API
const originsWhitelist = [
  'http://127.0.0.1:4000', 'http://localhost:4000', 'http://127.0.0.1:4200', 'http://localhost:4200',
  'astria.inquantir.com'
];
const corsOptions: cors.CorsOptions = {
  origin: (origin, callback) => {
    if (origin) {
      const isWhitelisted = originsWhitelist.indexOf(origin) !== -1;
      callback(null, isWhitelisted);
    }
  },
  credentials: true
}
app.use(cors(corsOptions));

// Passport Middleware

// Access Control
app.use( (req, res, next) => {
  const allowedOrigins = [
    'http://127.0.0.1:4000', 'http://localhost:4000', 'http://127.0.0.1:4200', 'http://localhost:4200',
    'astria.inquantir.com'
  ];
  const origin = req.headers.origin;
  if (origin && typeof origin === 'string' && allowedOrigins.indexOf(origin) > -1) {
       res.setHeader('Access-Control-Allow-Origin', origin);
  }
  res.header('Access-Control-Allow-Origin', 'http://localhost:4200');
  res.header('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  return next();
});

userPassportAuth(passport);
// adminPassportAuth(passport);
passport.use('mt-admin', asAdminStrategy);

app.use(passport.initialize());
app.use(passport.session());

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

app.use(apiBase + 'courses', RoutesLib.CourseRoutes);
app.use(apiBase + 'persons', RoutesLib.PersonRoutes);
app.use(apiBase + 'schools', RoutesLib.SchoolRoutes);
app.use(apiBase + 'announcements', RoutesLib.AnnouncementRoutes);
app.use(apiBase + 'enrollments', RoutesLib.EnrollmentRoutes);

// create public folder with the index.html when finished
// app.use(express.static(path.join(__dirname, 'public')));
console.log(apiBase);
app.get(apiBase, (req, res) => {
  const resText = '<h1>404 - Here\'s a cool picture of Blaziken and Lucario:<br><br>';
  const resImg = '<img src="https://pm1.narvii.com/6179/5434c40be48978d53a89c43c581bb0d84d1a4c56_hq.jpg">';
  res.status(404).send(resText + resImg);
});


if (process.env.NODE_ENV === 'PRODUCTION' || process.env.NODE_ENV === 'DEVTEST') {
  const httpsServer = https.createServer(credentials, app);
  httpsServer.listen(port, () => {
    console.log('\nAstria Backend started in mode \'' + process.env.NODE_ENV + '\'');
    console.log('TLS/HTTPS enabled.');
    console.log('Port: ' + port);
  });
} else {
  app.listen(port, () => {
    console.log('\nAstria Backend started in mode \'' + process.env.NODE_ENV + '\'');
    console.log('TLS/HTTPS is off.');
    console.log('Port: ' + port);
  });
}
