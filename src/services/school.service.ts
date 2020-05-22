import { School, ISchool } from '@models/school.model';
import { ModelService } from '@classes/model.service.class';

class SchoolService extends ModelService<ISchool> {
  private static instance: SchoolService;

  private constructor() {
    super(School);
  }

  public static getInstance(): SchoolService {
    if (!SchoolService.instance) {
      SchoolService.instance = new SchoolService();
    }

    return SchoolService.instance;
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
}

const schoolService = SchoolService.getInstance();
export default schoolService;
