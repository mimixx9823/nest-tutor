import { DataSource } from 'typeorm';

import { Module } from '@nestjs/common';
import { getDataSourceToken, TypeOrmModule } from '@nestjs/typeorm';

import { BoardsController } from './boards.controller';
import { Board } from './boards.entity';
import { BoardRepository } from './boards.repository';
import { BoardsService } from './boards.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Board]),
  ],
  controllers: [BoardsController],
  providers: [BoardsService, 
    {
      provide: BoardRepository,
      useFactory: (dataSource: DataSource) => {
        return new BoardRepository(dataSource);
      },
      inject: [getDataSourceToken()],
    },
  ],
  exports: [BoardRepository]
})
export class BoardsModule {}
