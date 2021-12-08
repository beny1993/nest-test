import { TaskStatus } from '../domain/enum/task-status.enum';

export interface Tasks {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
}
