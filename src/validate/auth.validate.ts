import { LogService } from '@logger/logger.ts';

export function validateLogin(body: any): {success: boolean, msg: string} {
  if (body.password.length < 8) {
    LogService.log('error', 'Authentication: User tried to log in with password of length < 8');
    return {success: false, msg: 'Password length must be bigger than 8.'};
  } else if (body.email.length === 0) {
    LogService.log('error', 'Authentication: User tried to log in with email of length 0.');
    return {success: false, msg: 'Email must not be empty.'};
  } else if (!body.email.includes('@')) {
    LogService.log('error', 'Authentication: User tried to log in with invalid email.');
    return {success: false, msg: 'Invalid email...'};
  } else {
    return {success: true, msg: 'Logged in!'};
  }
}
