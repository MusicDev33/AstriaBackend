import { IAssignSubmission } from '@models/assign-submission.model';
import { AssignSubmission } from '@schemas/assign-submission.schema';
import { ModelService } from '@classes/model.service.class';

class AssignSubmissionService extends ModelService<IAssignSubmission> {
  private static instance: AssignSubmissionService;

  private constructor() {
    super(AssignSubmission);
  }

  public static getInstance(): AssignSubmissionService {
    if (!AssignSubmissionService.instance) {
      AssignSubmissionService.instance = new AssignSubmissionService();
    }

    return AssignSubmissionService.instance;
  }

  public async autosaveAssignmentSubmission(submission: IAssignSubmission): Promise<IAssignSubmission | null> {
    const foundSub = await assignSubmissionService.findOneModelByParameter('_id', submission._id);

    if (!foundSub) {
      return null;
    }

    foundSub.objects = submission.objects;
    const autosaved = await assignSubmissionService.saveChangedModel(foundSub, 'objects');
    if (!autosaved) {
      return null;
    }

    return submission;
  }

  public async finalSaveSubmission(submission: IAssignSubmission): Promise<string> {
    const savedSubmission = await this.saveChangedModel(submission, 'objects');

    return savedSubmission;
  }
}

const assignSubmissionService = AssignSubmissionService.getInstance();
export default assignSubmissionService;
