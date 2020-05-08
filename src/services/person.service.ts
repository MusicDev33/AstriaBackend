import { Person, IPerson } from '@models/person.model';
import { ModelService } from '@classes/model.service.class';

import * as bcrypt from 'bcryptjs';

class PersonService extends ModelService<IPerson> {
  private static instance: PersonService;

  private constructor() {
    super();
  }

  public static getInstance(): PersonService {
    if (!PersonService.instance) {
      PersonService.instance = new PersonService();
    }

    return PersonService.instance;
  }

  public async saveChangedPerson(changedPerson: IPerson, changedParam: string): Promise<string> {
    changedPerson.markModified(changedParam);
    try {
      const savedCourse = await changedPerson.save();
      if (savedCourse) {
        return 'Successfully changed parameter \'' + changedParam + '\'';
      }
      return 'Couldn\'t change param \'' + changedParam + '\' and it\'s totally our fault. Try again?';
    } catch (err) {
      console.log(err);
      return 'Error - Insert error code here';
    }
  }

  public async registerPerson(person: IPerson): Promise<IPerson | null> {
    const salt = await bcrypt.genSalt(13);
    const hashedPassword = await bcrypt.hash(person.password, salt);
    person.password = hashedPassword;

    try {
      const savedModel = await person.save();
      return savedModel;
    } catch (err) {
      console.log(err);
      return null;
    }
  }

  public async findOnePersonByParameter(param: string, paramValue: any): Promise<IPerson | null> {
    try {
      const query: any = {};
      query[param] = paramValue;
      const foundPerson = await Person.findOne(query).exec();
      return foundPerson;
    } catch (err) {
      console.log(err);
      return null;
    }
  }

  public async findPersonsByParameter(param: string, paramValue: any, sort: any = {_id: 1}, limit: number = 30): Promise<IPerson[] | null> {
    try {
      const query: any = {};
      query[param] = paramValue;
      const foundPersons = await Person.find(query).sort(sort).limit(limit).exec();
      return foundPersons;
    } catch (err) {
      console.log(err);
      return null;
    }
  }

  public async findPersonsByQuery(query: any, sort: any = {_id: 1}, limit: number = 30): Promise<IPerson[] | null> {
    try {
      const foundPersons = await Person.find(query).sort(sort).limit(limit).exec();
      return foundPersons;
    } catch (err) {
      console.log(err);
      return null;
    }
  }

  public async countDocsByParameter(param: string, paramValue: any): Promise<number | null> {
    try {
      const query: any = {};
      query[param] = paramValue;
      const docCount = await Person.countDocuments(query).exec();
      return docCount;
    } catch (err) {
      console.log(err);
      return null;
    }
  }

  public async comparePassword(userPass: string, hashedPassword: string): Promise<boolean> {
    return await bcrypt.compare(userPass, hashedPassword);
  }

  // Still not sure what the best way to semantically to type this is
  public async deleteAll(): Promise<any | null> {
    try {
      const deletedAllPersons = await Person.deleteMany({}).exec();
      return deletedAllPersons;
    } catch (err) {
      console.log(err);
      return null;
    }
  }
}

const personService = PersonService.getInstance();
export default personService;
