import {EntityRepository, Repository} from "typeorm";
import {Task} from "../domain/entity/task-entity";
import {GetTasksFilterDto} from "../domain/dto/get-tasks-filter.dto";
import {CreateTaskDto} from "../domain/dto/create-task.dto";
import {TaskStatus} from "../domain/enum/task-status.enum";
import {User} from "../domain/entity/user-entity";

@EntityRepository(Task)
export class TaskRepository extends Repository<Task>{

    async getTasks(filterDTO: GetTasksFilterDto, user: User): Promise<Task[]> {
        const { status, search } = filterDTO;
        const query = this.createQueryBuilder('task');
        query.where('task.userId = :userId', {userId: user.id})
        if (status) {
            query.andWhere('task.status = :status', { status });
        }

        if (search) {
            query.andWhere('(task.title LIKE :search OR task.description LIKE :search)', { search: `%${search}%` });
        }

        return await query.getMany();
    }

    async createTask(createTaskDTO: CreateTaskDto, user:User): Promise<Task> {
        const { title, description } = createTaskDTO;

        const task = new Task();
        task.title = title;
        task.description = description;
        task.user = user;
        task.status = TaskStatus.OPEN;
        await task.save();

        return task;
    }
}