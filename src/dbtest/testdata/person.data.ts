import { Person } from '@models/person.model';

const testPerson1 = new Person({
  profileURL: 'test-1',
  name: 'Test Smith',
  bio: 'I\'m a test person!',
  schoolID: 'UtahStateUniversity',
  personType: 'Student'
});

const testPerson2 = new Person({
  profileURL: 'test-2',
  name: 'Brad Davidson',
  bio: 'I like organic chemistry!',
  schoolID: 'UtahStateUniversity',
  personType: 'Instructor'
});

const testPerson3 = new Person({
  profileURL: 'test-3',
  name: 'Test Adams',
  bio: 'I don\'t know who I am!',
  schoolID: 'UtahStateUniversity',
  personType: 'Student'
});

export const persons = [testPerson1, testPerson2, testPerson3];
