export function generatePassword(): string {
  const length = 12
  const lowerCase = 'abcdefghijklmnopqrstuvwxyz';
  const upperCase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const numbers = '0123456789';
  const special = '!?<>%^&-';

  const charset = lowerCase + upperCase + numbers + special;

  let password = '';
  for (let i = 0, n = charset.length; i < length; ++i) {
    password += charset.charAt(Math.floor(Math.random() * n));
  }

  if (!(/[a-z]/.test(password))) {
    return generatePassword();
  } else if (!(/[A-Z]/.test(password))) {
    return generatePassword();
  } else if (!(/[0-9]/.test(password))) {
    return generatePassword();
  } else if (!(/[!?<>%^&-]/.test(password))) {
    return generatePassword();
  }

  return password;
}
