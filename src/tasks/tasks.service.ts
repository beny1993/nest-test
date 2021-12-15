import {Injectable, NotFoundException} from '@nestjs/common';
import {TaskRepository} from './task.repository';
import {InjectRepository} from '@nestjs/typeorm';
import {Task} from "../domain/entity/task-entity";
import {GetTasksFilterDto} from "../domain/dto/get-tasks-filter.dto";
import {CreateTaskDto} from "../domain/dto/create-task.dto";
import {TaskStatus} from "../domain/enum/task-status.enum";
import {User} from "../domain/entity/user-entity";


@Injectable()
export class TasksService {
    constructor(
        @InjectRepository(TaskRepository)
        private taskRepository: TaskRepository
    ) {
    }

    async getTasks(filterDTO: GetTasksFilterDto, user: User): Promise<Task[]> {
        return this.taskRepository.getTasks(filterDTO, user);
    }

    async createTask(createTaskDTO: CreateTaskDto, user:User): Promise<Task> {
        return this.taskRepository.createTask(createTaskDTO, user);
    }

    async deleteTask(id: number): Promise<void> {
        const result = await this.taskRepository.delete(id);

        if (result.affected === 0) {
            throw new NotFoundException(`Task with ID ${id} not found`);
        }
    }

    async updateTaskStatus(id: number, status: TaskStatus): Promise<Task> {
        const task = await this.getTaskById(id);
        task.status = status;
        await task.save();
        return task;
    }

    async getTaskById(id: number): Promise<Task> {
        const found = await this.taskRepository.findOne(id);

        if(!found){
            throw new NotFoundException(`Task with ID ${id} not found`);
        }
        return  found;
}
}