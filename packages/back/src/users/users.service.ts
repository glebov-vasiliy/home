import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { User } from './users.entity'
import * as bcrypt from 'bcrypt'
import { UserJWTPayload } from '../autch/types'

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

  validateName(name: string): boolean {
    return name && /^[A-Za-z]+$/g.test(name)
  }
  validateUsername(username: string): boolean {
    return username && /^[A-Za-z\d]+$/g.test(username)
  }
  validatePassword(password: string): boolean {
    return !!password // TODO mb create password rules
  }

  async createUser({ name = '', username = '', password = '' }): Promise<string> {
    if (!this.validateName(name)) return 'wrongName'
    if (!this.validateUsername(username)) return 'wrongUsername'
    if (!this.validatePassword(password)) return 'wrongPassword'
    if (await this.count(username)) return 'userExisting'
    await this.usersRepository.insert({
      name,
      username,
      password: bcrypt.hashSync(password, 10, (err, hash) => hash),
      isActive: false,
    })
    return 'userAdded'
  }

  async updateName(user: UserJWTPayload, { name = '' }): Promise<string> {
    if (!this.validateName(name)) return 'wrongName'
    await this.usersRepository.update({ id: Number(user.userId) }, { name })
    return 'userUpdate'
  }
}
