import { Body, Controller, Delete, Get, Logger, Param, ParseIntPipe, Patch, Post, Query, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/custom-decoratos/get-user.decorator';
import { UserEntity } from 'src/auth/entities/user.entity';
import { DeleteResult } from 'typeorm';
import { TaskStatusValidationPipe, TaskStatus, CreateTaskDTO, SearchTaskDTO } from '.';
import { TaskEntity } from './entities/task.entity';
import { TasksService } from './tasks.service';

@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
  private logger = new Logger('TasksController')
  constructor (
    private readonly taskService: TasksService
  ) {}

  @Get()
  async getTasks (
    @Query(ValidationPipe) searchTaskDTO: SearchTaskDTO,
    @GetUser() user: UserEntity
  ): Promise<Array<TaskEntity>> {
    this.logger.verbose(`User "${user.username}" retrieving all tasks. Filters: ${JSON.stringify(searchTaskDTO)}`)
    return await this.taskService.getTasks(searchTaskDTO, user)
  }

  @Post()
  @UsePipes(ValidationPipe)
  async createTask (
    @Body() createTaskDTO: CreateTaskDTO,
    @GetUser() user: UserEntity
  ): Promise<TaskEntity> {
    this.logger.verbose(`User "${user.username}" creating a new task. Data: ${JSON.stringify(createTaskDTO)}`)
    return await this.taskService.createTask(createTaskDTO, user)
  }

  @Get('/:id')
  async getTaskById(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: UserEntity
  ): Promise<TaskEntity> {
    return await this.taskService.getTaskById(id, user)
  }

  @Delete('/:id')
  async deleteTaskById(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: UserEntity
  ): Promise<DeleteResult> {
    return await this.taskService.deleteTaskById(id, user)
  }

  @Patch('/:id/status')
  async pathStatusByTaskId(
    @Param('id', ParseIntPipe) id: number,
    @Body('status', TaskStatusValidationPipe) status: TaskStatus,
    @GetUser() user: UserEntity
  ): Promise<TaskEntity> {
    return await this.taskService.pathTaskStatusById(id, status, user)
  }
}
