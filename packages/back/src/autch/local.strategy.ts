import { Strategy } from 'passport-local'
import { PassportStrategy } from '@nestjs/passport'
import { Injectable, UnauthorizedException } from '@nestjs/common'
import { AuthService } from './auth.service'
import { User } from '../users/users.entity'
import { UsersService } from '../users/users.service'
import * as bcrypt from 'bcrypt'

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService, private usersService: UsersService) {
    super()
  }
  async validate(username: string, password: string): Promise<Omit<User, 'password'>> {
    const user = await this.usersService.findOne(username)
    if (user && bcrypt.compareSync(password, user.password) && user.isActive) {
      const { password, ...rest } = user
      void password
      return rest
    }
    throw new UnauthorizedException()
  }
}
