import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { JwtPayload } from '../interfaces/jwt-payload';
import { envConfig } from '../config';
import { UserService } from 'src/modules/auth/user/user.service';
import { AccessService } from 'src/modules/access/access.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly userService: UserService, private readonly accessService: AccessService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: envConfig().jwtSecret,
    });
  }

  async validate(payload: JwtPayload) {
    const { sub } = payload;
    const user = await this.userService.findById(sub);

    if (!user || !user.isActive) {
      throw new UnauthorizedException();
    }

    // Obtener el rol del usuario
    const userAccess = await this.accessService.findByUserId(user.id);

    return {
      id: user.id,
      email: user.email,
      fullName: user.fullName,
      isActive: user.isActive,
      role: userAccess[0].role.name || null
    };
  }
} 