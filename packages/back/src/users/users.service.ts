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

  async createUser({ name = '', username = '', password = '' }) {
    if (!name || !/^[A-Za-z]+$/g.test(name)) throw new HttpException('wrongName', HttpStatus.BAD_REQUEST)
    if (!username || !/^[A-Za-z\d]+$/g.test(username)) throw new HttpException('wrongLogin', HttpStatus.BAD_REQUEST)
    if (!password) throw new HttpException('wrongPassword', HttpStatus.BAD_REQUEST) // TODO mb create password rules
    if (await this.count(username)) throw new HttpException('userExisting', HttpStatus.BAD_REQUEST)

    await this.usersRepository.insert({
      name,
      username,
      password: bcrypt.hashSync(password, 10, (err, hash) => hash),
      isActive: false,
    })
    return { status: 'success', message: 'userAdded' }
  }

  // async remove(id: string): Promise<void> {
  //   await this.usersRepository.delete(id)
  // }
}
