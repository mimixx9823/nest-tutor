import { v1 as uuid } from 'uuid';

import { Injectable } from '@nestjs/common';

import { BoardStatus } from './boards.define';
import { CreateBoardDto } from './dto/boards.req.dto';
import { ResBoard } from './dto/boards.res.dto';

@Injectable()
export class BoardsService {
  private boards: ResBoard[] = [];

  getAllBoards(): ResBoard[] {
    return this.boards;
  }

  createBoard(createBoardDto: CreateBoardDto) {
    const { title, description } = createBoardDto;
    const board: ResBoard = {
      id: uuid(),
      title, // title: title 과 같은 의미 (변수명이 같으면 알아서 연결됨)
      description,
      status: BoardStatus.PUBLIC,
    };

    this.boards.push(board);
    return board;
  }

  getBoardById(id: string): ResBoard {
    return this.boards.find((b) => b.id === id);
  }

  deleteBoard(id: string): void {
    this.boards = this.boards.filter((b) => b.id !== id);
  }

  updateBoardStatus(id: string, status: BoardStatus): ResBoard {
    const board = this.getBoardById(id);
    board.status = status;
    return board;
  }
}
