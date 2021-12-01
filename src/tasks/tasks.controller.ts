import { TaskStatusValidationPipe } from './pipes/task-status-validation.pipe';
import { CreateTaskDto } from './dto/create-task.dto';
import { Tasks, TaskStatus } from './task.model';
import { TasksService } from './tasks.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';

@Controller('tasks')
export class TasksController {
  constructor(private TasksService: TasksService) {}

  @Get()
  getTasks(@Query() filterDto: GetTasksFilterDto): Tasks[] {
    if (Object.keys(filterDto).length) {
      return this.TasksService.getTaskWithFilter(filterDto);
    }
    return this.TasksService.getAllTasks();
  }

  @Post()
  @UsePipes(ValidationPipe) // use for validation data must not be null first add in dto and second in here
  createTask(@Body() createTaskDto: CreateTaskDto): Tasks {
    return this.TasksService.createTasks(createTaskDto);
  }

  @Delete('/:id')
  deleteTask(@Param('id') id: string): void {
    return this.TasksService.deleteTaskById(id);
  }

  @Patch('/:id/status')
  updateTaskStatus(
    @Param('id') id: string,
    @Body('status', TaskStatusValidationPipe) status: TaskStatus, // this is validity pipe
  ): Tasks {
    return this.TasksService.updateTaskStatus(id, status);
  }
}
