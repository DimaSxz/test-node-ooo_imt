import { Controller, Get, Req, Request } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { Task } from './task.entity';
import { TasksService } from './tasks.service';

@Crud({
  model: {
    type: Task,
  },
})
@Controller('tasks')
export class TasksController implements CrudController<Task> {
  constructor(public service: TasksService) {}

  @Get('/paginate/')
  async paginate(@Request() request): Promise<any> {
    const { limit, page } = request.query;
    return await this.service.paginate({ limit, page });
  }
}
