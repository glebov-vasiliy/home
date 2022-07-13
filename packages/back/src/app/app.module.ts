import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { EventsModule } from '../ewents/events.module'
import { UnitsModule } from '../units/units.module'
import { UsersModule } from '../users/users.module'
import { User } from '../users/users.entity'
import { Unit } from '../units/units.entity'

@Module({
  imports: [
    EventsModule,
    UnitsModule,
    UsersModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.NX_MYSQL_HOST,
      port: Number(process.env.NX_MYSQL_PORT),
      username: process.env.NX_MYSQL_USER,
      password: process.env.NX_MYSQL_PASSWORD,
      database: process.env.NX_MYSQL_BASE,
      entities: [User, Unit],
      synchronize: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
