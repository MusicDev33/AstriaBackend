import { ITask } from '@models/task.model';
import { Task } from '@schemas/task.schema';
import { ModelService } from '@classes/model.service.class';

class TaskService extends ModelService<ITask> {
  private static instance: TaskService;

  private constructor() {
    super(Task);
  }

  public static getInstance(): TaskService {
    if (!TaskService.instance) {
      TaskService.instance = new TaskService();
    }

    return TaskService.instance;
  }
}

const taskService = TaskService.getInstance();
export default taskService;
