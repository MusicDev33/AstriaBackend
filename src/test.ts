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

mongoose.connection.on('connected', async () => {
  console.log('Database Connected: ' + dbConfig.database);

  // Run Test Suite
  const courseDriver = new CourseTestDriver();
  await courseDriver.runTests();

  console.log('Testing Finished');
  process.exit(0);
});

mongoose.connection.on('error', (err: any) => {
  console.log('Database Error: ' + err);
});
