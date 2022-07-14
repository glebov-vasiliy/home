import { Module } from '@nestjs/common'
import { UsersLoginController, UsersController } from './users.controller'
import { UsersService } from './users.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { User } from './users.entity'

@Module({
  controllers: [UsersController, UsersLoginController],
  providers: [UsersService],
  imports: [TypeOrmModule.forFeature([User])],
})
export class UsersModule {}
