import { Body, Controller, HttpException, HttpStatus, Post } from '@nestjs/common'
import { UsersService } from './users.service'

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Post('signup')
  async createUser(@Body() body) {
    const status = await this.userService.createUser(body)
    if (status === 'userAdded') return { status: 'success', message: status }
    throw new HttpException(status, HttpStatus.BAD_REQUEST)
  }
}
