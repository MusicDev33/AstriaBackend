// tslint:disable-next-line
require('tsconfig-paths/register');
import bodyParser from 'body-parser';
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

const rustAddons = require('../native');
/*
import { userPassportAuth } from '@config/passport';
import { UserRoutes, QuestionRoutes, SubjectRoutes, SourceRoutes, FeedRoutes, FeedbackRoutes, SearchRoutes, UploadRoutes } from './config/routeDefs';
*/

import { Request, Response } from 'express';
dotenv.config();

let credentials: {key: string, cert: string} = {key: '', cert: ''};

if (process.env.NODE_ENV === 'PRODUCTION' || process.env.NODE_ENV === 'DEVTEST') {
  const privateKey  = fs.readFileSync('/etc/letsencrypt/live/inquantir.com/privkey.pem', 'utf8');
  const certificate = fs.readFileSync('/etc/letsencrypt/live/inquantir.com/cert.pem', 'utf8');

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

app.use(helmet());
app.disable('x-powered-by');
app.set('trust proxy', 1);

// Allows other domains to use this domain as an API
app.use(cors());

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

// userPassportAuth(passport);

// Check IQ-User-Agent
const checkAgent = (req: Request, res: Response, next: any) => {
  const agent = req.header('AS-User-Agent') as string;
  if (acceptedAgents.indexOf(agent) <= -1) {
    const resText = '<h1>404 - Here\'s a cool picture of Blaziken and Lucario:<br><br>';
    const resImg = '<img src="https://pm1.narvii.com/6179/5434c40be48978d53a89c43c581bb0d84d1a4c56_hq.jpg">'
    res.status(404).send(resText + resImg);
  }
  next();
};

// app.use(checkAgent);

// Routes

app.use(apiBase + 'courses', RoutesLib.CourseRoutes);
app.use(apiBase + 'persons', RoutesLib.PersonRoutes);

// create public folder with the index.html when finished
// app.use(express.static(path.join(__dirname, 'public')));
console.log(apiBase);
app.get(apiBase, (req, res) => {
  res.status(404).send('404 Error');
});


if (process.env.NODE_ENV === 'PRODUCTION' || process.env.NODE_ENV === 'DEVTEST') {
  const httpsServer = https.createServer(credentials, app);
}

app.listen(port, () => {
  console.log('\nAstria Backend started in mode \'' + process.env.NODE_ENV + '\'');
  console.log('Port: ' + port);
});
