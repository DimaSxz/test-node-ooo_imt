import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksModule } from './tasks/tasks.module';
import { Task } from './tasks/task.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: process.env.DB_TYPE || ('mysql' as any),
      host: String(process.env.DB_HOST) || '127.0.0.1',
      port: Number(process.env.DB_PORT) || 3306,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      synchronize: process.env.DB_SYNC
        ? process.env.DB_SYNC === 'true'
        : undefined,
      dropSchema: process.env.DB_DROP
        ? process.env.DB_DROP === 'true'
        : undefined,
      logging: process.env.DB_LOG ? process.env.DB_LOG === 'true' : undefined,
      entities: [Task],
      migrations: ['migrations/**/*.ts'],
      subscribers: ['subscriber/**/*.ts', 'dist/subscriber/**/.js'],
      cli: {
        entitiesDir: 'src',
        migrationsDir: 'migrations',
        subscribersDir: 'subscriber',
      },
    }),
    TasksModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
