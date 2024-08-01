import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { BoardStatus } from './boards.define';
import { Board } from './boards.entity';
import { BoardRepository } from './boards.repository';
import { CreateBoardDto } from './dto/boards.req.dto';

@Injectable()
export class BoardsService {
  constructor(
    private readonly boardRepository: BoardRepository
  ) {}

  async getAllBoards(): Promise<Board[]> {
    return await this.boardRepository.findBoard();
  }

  async createBoard(createBoardDto: CreateBoardDto) : Promise<Board> {
    return await this.boardRepository.createBoard(createBoardDto);
  }

  async getBoardById(id: number): Promise<Board> {
    return await this.boardRepository.findOneBoard(id);
  }

  async deleteBoard(id: number): Promise<void> {
    await this.boardRepository.deleteBoard(id);
  }

  async updateBoardStatus(id: number, status: BoardStatus): Promise<Board> {
    const board = await this.boardRepository.updateBoardStatus(id, status);
    return board;
  }
}
