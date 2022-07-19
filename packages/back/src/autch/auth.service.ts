import { Injectable } from '@nestjs/common'
import { UsersService } from '../users/users.service'
import { JwtService } from '@nestjs/jwt'

import { User } from '../users/users.entity'

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService, private jwtService: JwtService) {}

  async login({ username, id }: Omit<User, 'password'>) {
    return {
      accessToken: this.jwtService.sign({ username, id }),
    }
  }
}
