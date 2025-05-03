import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { RoleService } from "./role/role.service";
import { UserService } from "./user/user.service";
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { RoleType } from "./role/entity/role.entity";
import { SignUpDto } from "./dto/sign-up.dto";
import { SignInDto } from "./dto/sign-in.dto";
import { AccessService } from "../access/access.service";
@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly roleService: RoleService,
        private readonly jwtService: JwtService,
        private readonly accessService: AccessService,
    ) {}

    async signIn(signInDto: SignInDto) {
        const { email, password } = signInDto;
    
        const user = await this.userService.findByEmail(email);
        if (!user) {
          throw new UnauthorizedException('Invalid credentials');
        }
    
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
          throw new UnauthorizedException('Invalid credentials');
        }
        const userAccess = await this.accessService.userAccess(user._id.toString());
    
        const payload = { 
          sub: user._id.toString(), 
          email: user.email,
          role: userAccess.role.name,
        };
    
        return {
          user: {
            id: user._id.toString(),
            email: user.email,
            fullName: user.fullName,
            role: userAccess.role.name,
          },
          accessToken: await this.jwtService.signAsync(payload, { expiresIn: '12h' }),
        };
      }

    async signUp(registerDto: SignUpDto) {
        const { email, password, fullName, roleType } = registerDto;

        const existingUser = await this.userService.findByEmail(email);
        if (existingUser) {
          throw new BadRequestException('Email already exists');
        }

        // Si se solicita SUPER_ADMIN, verificar que no exista ninguno
        if (roleType === RoleType.SUPERADMIN) {
          const existingSuperAdmin = await this.userService.findByEmail(email);

          if (existingSuperAdmin) {
            throw new BadRequestException('Ya existe un super administrador');
          }
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await this.userService.createUser({
          email,
          password: hashedPassword,
          fullName,
        });
        
        if (!user || !user._id) {
          throw new BadRequestException('Error al crear el usuario');
        }

        await this.accessService.createUserAccess(user._id.toString(), roleType);

        const role = await this.roleService.findOne(roleType);

        if (!role) {
          throw new NotFoundException('Role not found');
        }

        // Limpiamos la respuesta
        const cleanUser = {
            id: user._id.toString(),
            fullName: user.fullName,
            email: user.email,
            isActive: user.isActive,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt
        };

        return cleanUser;
    }
}