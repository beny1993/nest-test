import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
// import { typeOrmConfig } from './config/typeorm.config';
import { TasksModule } from './tasks/tasks.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'postgres',
        host: 'localhost',
        port: 5432,
        username: 'benyamin',
        password: 'BENY@123',
        database: 'postgres',
        entities: [__dirname + '/domain/*/.entity{.ts,.js}'],
        synchronize: true,
        logging: ['error'],
      }),
    }),

    TasksModule,
  ],
})
export class AppModule {}
