import { Body, Controller, HttpException, HttpStatus, Patch, Post, UseGuards, Req } from '@nestjs/common'
import { UsersService } from './users.service'
import { JwtAuthGuard } from '../autch/jwt-auth.guard'
import { UserJWTPayload } from '../autch/types'

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Post('signup')
  async createUser(@Body() body) {
    const status = await this.userService.createUser(body)
    if (status === 'userAdded') return { status: 'success', message: status }
    throw new HttpException(status, HttpStatus.BAD_REQUEST)
  }

  @Patch('updateName')
  @UseGuards(JwtAuthGuard)
  async updateUser(@Body() body, @Req() req: { user: UserJWTPayload }) {
    const status = await this.userService.updateName(req.user, body)
    if (status === 'userUpdate') return { status: 'success', message: status }
    throw new HttpException(status, HttpStatus.BAD_REQUEST)
  }
}
