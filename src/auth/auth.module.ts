import { DataSource } from 'typeorm';

import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { getDataSourceToken, TypeOrmModule } from '@nestjs/typeorm';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { User } from './user.entity';
import { UserRepository } from './user.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      secret: 'Secret1234',
      signOptions: {
        expiresIn: 60 * 60,
      },
    }),
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtStrategy,
    {
      provide: UserRepository,
      useFactory: (dataSource: DataSource) => {
        return new UserRepository(dataSource);
      },
      inject: [getDataSourceToken()],
    },
  ],
  exports: [JwtStrategy, PassportModule],
})
export class AuthModule {}
