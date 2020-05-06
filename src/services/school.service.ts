import { School, ISchool } from '@models/school.model';
import { ModelService } from '@classes/model.service.class';

class SchoolService extends ModelService<ISchool> {
  private static instance: SchoolService;

  private constructor() {
    super();
  }

  public static getInstance(): SchoolService {
    if (!SchoolService.instance) {
      SchoolService.instance = new SchoolService();
    }

    return SchoolService.instance;
  }

  public async saveChangedSchool(changedSchool: ISchool, changedParam: string): Promise<string> {
    changedSchool.markModified(changedParam);
    try {
      const savedSchool = await changedSchool.save();
      if (savedSchool) {
        return 'Successfully changed parameter \'' + changedParam + '\'';
      }
      return 'Couldn\'t change param \'' + changedParam + '\' and it\'s totally our fault. Try again?';
    } catch (err) {
      console.log(err);
      return 'Error - Insert error code here';
    }
  }

  public async findOneSchoolByParameter(param: string, paramValue: any): Promise<ISchool | null> {
    try {
      const query: any = {};
      query[param] = paramValue;
      const foundSchool = await School.findOne(query).exec();
      return foundSchool;
    } catch (err) {
      console.log(err);
      return null;
    }
  }

  public async findSchoolsByParameter(param: string, paramValue: any, sort: any = {_id: 1}, limit: number = 30): Promise<ISchool[] | null> {
    try {
      const query: any = {};
      query[param] = paramValue;
      const foundSchool = await School.find(query).sort(sort).limit(limit).exec();
      return foundSchool;
    } catch (err) {
      console.log(err);
      return null;
    }
  }

  public async getAllSchools(sort: any = {_id: 1}, limit: number = 30): Promise<ISchool[] | null> {
    try {
      const query: any = {};
      const foundSchool = await School.find(query).sort(sort).limit(limit).exec();
      return foundSchool;
    } catch (err) {
      console.log(err);
      return null;
    }
  }

  // Still not sure what the best way to semantically to type this is
  public async deleteAll(): Promise<any | null> {
    try {
      const deletedAllSchool = await School.deleteMany({}).exec();
      return deletedAllSchool;
    } catch (err) {
      console.log(err);
      return null;
    }
  }
}

const schoolService = SchoolService.getInstance();
export default schoolService;
