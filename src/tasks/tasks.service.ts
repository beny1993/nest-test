import { CreateTaskDto } from './dto/create-task.dto';
import { Tasks, TaskStatus } from './task.model';
import { Injectable, NotFoundException, Param } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { stat } from 'fs';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
@Injectable()
export class TasksService {
  private tasks: Tasks[] = [];

  getAllTasks(): Tasks[] {
    return this.tasks;
  }

  createTasks(createTaskDto: CreateTaskDto): Tasks {
    const { title, description } = createTaskDto;

    const task: Tasks = {
      id: uuidv4(),
      title,
      description,
      status: TaskStatus.OPEN,
    };

    this.tasks.push(task);
    return task; //for front end help to show the new task which was made.
  }

  getTaskById(id: string): Tasks {
    const found = this.tasks.find((task) => task.id === id);

    if (!found) {
      throw new NotFoundException(`Task with ID "${id}" not found.`);
    }

    return found;
  }

  deleteTaskById(id: string): void {
    const found = this.getTaskById(id);
    this.tasks = this.tasks.filter((task) => task.id !== found.id);
  }

  updateTaskStatus(id: string, status: TaskStatus): Tasks {
    const task = this.getTaskById(id);
    task.status = status;
    return task;
  }

  getTaskWithFilter(filterDto: GetTasksFilterDto): Tasks[] {
    const { status, search } = filterDto;
    let tasks = this.getAllTasks();
    if (status) {
      tasks = tasks.filter((task) => task.status === status);
    }

    if (search) {
      tasks = tasks.filter(
        (task) =>
          task.title.includes(search) || task.description.includes(search),
      );
    }

    return tasks;
  }
}
