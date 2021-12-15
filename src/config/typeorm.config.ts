import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeOrmConfig: TypeOrmModuleOptions = {
    type: 'postgres',
    host: '192.168.131.196',
    port: 5432,
    username: 'postgres',
    password: 'benyamin',
    database: 'localdb',
    entities: [__dirname+'../**/*.entity.{ts,js}'],
    synchronize: true,
    logging: ['error'],
    autoLoadEntities: true,
};

