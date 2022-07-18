import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { User } from './users.entity'
import * as bcrypt from 'bcrypt'

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  findOne(username: string) {
    return this.usersRepository.findOne({
      select: ['id', 'username', 'password', 'isActive'],
      where: [{ username: username }],
    })
  }

  count(username: string) {
    return this.usersRepository.count({
      where: [{ username: username }],
    })
  }

  async createUser({ name = '', username = '', password = '' }): Promise<string> {
    if (!name || !/^[A-Za-z]+$/g.test(name)) return 'wrongName'
    if (!username || !/^[A-Za-z\d]+$/g.test(username)) return 'wrongLogin'
    if (!password) return 'wrongPassword' // TODO mb create password rules
    if (await this.count(username)) return 'userExisting'
    await this.usersRepository.insert({
      name,
      username,
      password: bcrypt.hashSync(password, 10, (err, hash) => hash),
      isActive: false,
    })
    return 'userAdded'
  }

  // async remove(id: string): Promise<void> {
  //   await this.usersRepository.delete(id)
  // }
}
