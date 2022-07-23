import { Strategy } from 'passport-jwt'
import { PassportStrategy } from '@nestjs/passport'
import { Injectable } from '@nestjs/common'
import { ExtractJwt } from 'passport-jwt'
import { Constants } from '../constants'
import { UserJWTPayload } from './types'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: Constants.secret,
    })
  }

  async validate(payload: { username: string; id: string }): Promise<UserJWTPayload> {
    return { userId: payload.id, username: payload.username }
  }
}
