import personService from '@services/person.service';
import { IPerson } from '@models/person.model';

class PersonTest {
  async testSavePersons(persons: IPerson[]) {
    for (const person of persons) {
      const saveResult =  await personService.saveModel(person);
      if (saveResult) {
        continue;
      }
      console.log(`Test Failed: Could not save person: ${person.name}`);
    }
  }

  async testGetPersons(param: string, paramValues: any[]) {
    for (const paramValue of paramValues) {
      const findResult = await personService.findPersonsByParameter(param, paramValue);
      if (findResult) {
        continue;
      }
      console.log(`Test Failed: Error searching person with value: ${paramValue}`);
    }
  }

  async cleanUp() {
    const cleanedUp = await personService.deleteAll();
    if (cleanedUp) {
      return;
    }
    console.log('Test Failed: Could not delete all persons');
  }
}

export default PersonTest;
