// tslint:disable-next-line
require('tsconfig-paths/register');
import dotenv from 'dotenv';
import mongoose from 'mongoose';

import { dbConfig } from '@config/test-db';

import { CourseTestDriver } from '@dbtest/course/course.driver';

dotenv.config();

mongoose.connect(dbConfig.database, {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

mongoose.connection.on('connected', () => {
  console.log('Database Connected: ' + dbConfig.database);
});

mongoose.connection.on('error', (err: any) => {
  console.log('Database Error: ' + err);
});

// Run Test Suite
const courseDriver = new CourseTestDriver();
courseDriver.runTests();
