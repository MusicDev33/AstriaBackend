import { Assignment, IAssignment } from '@models/assignment.model';
import { ModelService } from '@classes/model.service.class';

class AssignmentService extends ModelService<IAssignment> {
  private static instance: AssignmentService;

  private constructor() {
    super(Assignment);
  }

  public static getInstance(): AssignmentService {
    if (!AssignmentService.instance) {
      AssignmentService.instance = new AssignmentService();
    }

    return AssignmentService.instance;
  }
}

const assignmentService = AssignmentService.getInstance();
export default assignmentService;
