import { Controller, Get, UseGuards, Request } from '@nestjs/common'
import { AuthService } from './auth.service'
import { LocalAuthGuard } from './local-auth.guard'
import { JwtAuthGuard } from './jwt-auth.guard'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('login')
  @UseGuards(LocalAuthGuard)
  async login(@Request() { user }) {
    return this.authService.login(user)
  }

  @Get('check-token')
  @UseGuards(JwtAuthGuard)
  checkToken() {
    return { status: true }
  }
}
