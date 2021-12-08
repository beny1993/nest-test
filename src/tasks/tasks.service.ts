import { RabbitRPC } from '@golevelup/nestjs-rabbitmq';
import {
  Injectable,
  NotFoundException,
  OnModuleInit,
  Param,
} from '@nestjs/common';
import { retry } from 'rxjs';
import { Task } from 'src/domain/entity/task-entity';
import { TaskStatus } from 'src/domain/enum/task-status.enum';
import { v4 as uuidv4 } from 'uuid';
@Injectable()
export class TasksService implements OnModuleInit {
  async onModuleInit() {
    await this.ehsan();
  }

  @RabbitRPC({
    exchange: 'Exchange',
    routingKey: 'bep20.token.transfer',
    queue: 'bep20.token.transfer',
  })
  async ehsan() {
    console.log('ehsan');
  }
}
