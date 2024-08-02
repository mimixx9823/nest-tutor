import * as bcrypt from 'bcryptjs';
import { DataSource, Repository } from 'typeorm';

import { ConflictException, InternalServerErrorException } from '@nestjs/common';

import { AuthDto } from './dto/authDto';
import { User } from './user.entity';

export class UserRepository extends Repository<User> {
  constructor(dataSource: DataSource) {
    super(User, dataSource.createEntityManager());
  }

  async createUser(authDto: AuthDto): Promise<void> {
    const {username, password} = authDto;
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    
    const data = this.create({username, password: hashedPassword});

    try{
      await this.save(data);
    } catch (error) {
      if(error.code === '23505') {
        throw new ConflictException('Existing username');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }
}