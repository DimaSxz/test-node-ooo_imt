import { Get, Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './task.entity';

@Injectable()
export class TasksService extends TypeOrmCrudService<Task> {
  constructor(
    @InjectRepository(Task)
    private readonly tasksRepository: Repository<Task>,
  ) {
    super(tasksRepository);
  }

  async paginate({ limit = undefined, page = undefined } = {}): Promise<any> {
    const [results, count] = await this.tasksRepository
      .createQueryBuilder('tasks')
      .skip(page)
      .take(limit)
      .getManyAndCount();

    return {
      results,
      count,
    };
  }
}
