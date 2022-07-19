import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { EventsModule } from '../ewents/events.module'
import { UnitsModule } from '../units/units.module'
import { UsersModule } from '../users/users.module'
import { User } from '../users/users.entity'
import { Unit } from '../units/units.entity'
import { AuthModule } from '../autch/auth.module'
import { Constants } from '../constants'

@Module({
  imports: [
    EventsModule,
    UnitsModule,
    UsersModule,
    AuthModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: Constants.dbHost,
      port: Constants.dbPort,
      username: Constants.dbUser,
      password: Constants.dbPassword,
      database: Constants.dbBaseName,
      entities: [User, Unit],
      synchronize: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
