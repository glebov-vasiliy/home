import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { User } from './users.entity'
// import bcrypt from 'bcrypt'

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  checkLogin({ login, password }: { login: string; password: string }) {
    return true
    // const hash = 'sdfsd'
    // return bcrypt.compareSync(password, hash)
  }

  findAll(): Promise<User[]> {
    return this.usersRepository.find()
  }

  // findOne(id: string): Promise<User> {
  //   return this.usersRepository.findOneBy({ user_id })
  // }

  async remove(id: string): Promise<void> {
    await this.usersRepository.delete(id)
  }
}
