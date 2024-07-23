import {
    Body, Controller, Delete, Get, Param, Patch, Post, UsePipes, ValidationPipe
} from '@nestjs/common';

import { BoardStatus } from './boards.define';
import { BoardsService } from './boards.service';
import { CreateBoardDto } from './dto/boards.req.dto';
import { ResBoard } from './dto/boards.res.dto';

@Controller('boards')
export class BoardsController {
  constructor(private boardsService: BoardsService) {}

  @Get('/')
  getAllBoard(): ResBoard[] {
    return this.boardsService.getAllBoards();
  }

  @Post()
  @UsePipes(ValidationPipe)
  createBoard(@Body() body: CreateBoardDto): ResBoard {
    return this.boardsService.createBoard(body);
  }

  @Get('/:id')
  getBoardById(@Param('id') id: string): ResBoard {
    return this.boardsService.getBoardById(id);
  }

  @Delete('/:id')
  deleteBoard(@Param('id') id: string): void {
    this.boardsService.deleteBoard(id);
  }

  @Patch('/:id/status')
  updateBoardStatus(
    @Param('id') id: string,
    @Body('status') status: BoardStatus,
  ): ResBoard {
    return this.boardsService.updateBoardStatus(id, status);
  }
}
