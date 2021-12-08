import { Module } from '@nestjs/common';
// import { TypeOrmModule } from '@nestjs/typeorm';
// import { TaskRepository } from './task.repository';
// import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';

@Module({
  // controllers: [TasksController],
  providers: [TasksService],
})
export class TasksModule {}
