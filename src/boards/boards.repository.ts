import { User } from 'src/auth/user.entity';
import { DataSource, EntityManager, Repository } from 'typeorm';

import { Injectable, Logger, NotFoundException } from '@nestjs/common';

import { BoardStatus } from './boards.define';
import { Board } from './boards.entity';
import { CreateBoardDto } from './dto/boards.req.dto';

export class BoardRepository extends Repository<Board> {
  constructor(dataSource: DataSource) {
    super(Board, dataSource.createEntityManager());
  }

  async findBoard(): Promise<Board[]> {
    return await this.findBy({});
  }

  async createBoard(createBoardDto: CreateBoardDto, user: User): Promise<Board> {
    const { title, description } = createBoardDto;
    const board = this.create({
      // id: uuid(),
      title, // title: title 과 같은 의미 (변수명이 같으면 알아서 연결됨)
      description,
      status: BoardStatus.PUBLIC,
      user,
    });

    await this.save(board);
    return board;
  }

  async findOneBoard(id: number): Promise<Board> {
    const found = this.findOneBy({ id: id });
    if (!found) {
      throw new NotFoundException(`Can't find Board with id ${id}`);
    }
    return found;
  }

  async deleteBoard(id: number): Promise<void> {
    await this.delete({ id: id });
  }

  async updateBoardStatus(id: number, status: BoardStatus): Promise<Board> {
    const found = await this.update({ id: id }, { status: status });
    return found.raw;
  }
}
