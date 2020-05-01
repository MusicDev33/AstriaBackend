import { LogService } from '@logger/logger.ts';

export function validateRegister(body: any): {success: boolean, msg: string} {

  const personTypes = ['instructor', 'student'];

  // Check if SchoolID has illegal characters
  if (body.schoolID.indexOf(' ') > -1 || !body.schoolID.match(/^[a-z0-9_]+$/g)) {
    LogService.log('error', `Registration: Illegal character in SchoolID: ${body.schoolID}`);
    return {success: false, msg: 'Illegal character in SchoolID! For some reason, we decided that uppercase letters are illegal.'};
  }

  if (!personTypes.includes(body.personType)) {
    LogService.log('error', `Registration: Absent person type: ${body.personType}`);
    return {success: false, msg: 'An error occurred on our end, sorry about that!'};
  }

  if (!body.name.match(/^[a-zA-Z0-9_\- ']+$/g)) {
    LogService.log('error', `Registration: Illegal character in name: ${body.name}`);
    return {
      success: false,
      msg: 'Your name has illegal characters in it'
    };
  }

  if (!body.email && !body.email.includes('@')) {
    LogService.log('error', `Registration: Invalid email from client: ${body.email}`);
    return {success: false, msg: 'This is not a valid email!'};
  }

  if (body.password.length < 8) {
    LogService.log('error', 'Registration: Invalid password passed inspection');
    return {success: false, msg: 'Your password should be at least 8 characters.'};
  }

  return {success: true, msg: 'Cool!'};
}
