import PersonTest from './person.test';
import { persons } from '../testdata/person.data';

const personTest = new PersonTest();

export class PersonTestDriver {
  async runTests() {
    console.log('\n');
    console.log('Persons - Save Test');
    await personTest.testSavePersons(persons);

    console.log('Persons - Get Person Test');
    await personTest.testGetPersons('profileURL', ['test-1', 'test-2', 'test']);

    console.log('Persons - Clean Up');
    await personTest.cleanUp();
    console.log('Testing Finished - Persons');
  }
}
