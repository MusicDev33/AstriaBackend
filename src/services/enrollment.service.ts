import { Enrollment, IEnrollment } from '@models/enrollment.model';
import { ModelService } from '@classes/model.service.class';

class EnrollmentService extends ModelService<IEnrollment> {
  private static instance: EnrollmentService;

  private constructor() {
    super(Enrollment);
  }

  public static getInstance(): EnrollmentService {
    if (!EnrollmentService.instance) {
      EnrollmentService.instance = new EnrollmentService();
    }

    return EnrollmentService.instance;
  }
}

const enrollmentService = EnrollmentService.getInstance();
export default enrollmentService;
