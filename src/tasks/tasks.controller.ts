import {
    Body,
    Controller,
    Get,
    Param,
    ParseIntPipe,
    Post,
    Query,
    UseGuards,
    UsePipes,
    ValidationPipe
} from '@nestjs/common';
import {TasksService} from "./tasks.service";
import {Task} from "../domain/entity/task-entity";
import {AuthGuard} from '@nestjs/passport';
import {CreateTaskDto} from "../domain/dto/create-task.dto";
import {User} from "../domain/entity/user-entity";
import {GetUser} from "../auth/auth-user.decorator";
import {GetTasksFilterDto} from "../domain/dto/get-tasks-filter.dto";

@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
    constructor(private tasksService: TasksService) {
    }

    @Get()
    getTasks(@Query(ValidationPipe) filterDTO: GetTasksFilterDto,@GetUser() user: User): Promise<Task[]> {
        return this.tasksService.getTasks(filterDTO, user);
    }

    @Get('/:id')
    getTaskById(@Param('id', ParseIntPipe) id: number): Promise<Task> {
        return this.tasksService.getTaskById(id);
    }


    @Post()
    @UsePipes(ValidationPipe)
    createTask(@Body() createTaskDTO: CreateTaskDto, @GetUser() user: User): Promise<Task> {
        return this.tasksService.createTask(createTaskDTO, user);
    }

}
