import { Controller, Get, Query } from '@nestjs/common'
import { UsersService } from './users.service'

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get()
  findAll() {
    return this.userService.findAll()
  }
}
@Controller('users/login')
export class UsersLoginController {
  constructor(private readonly userService: UsersService) {}

  @Get()
  checkLogin(@Query() params) {
    return this.userService.checkLogin(params)
  }
}
