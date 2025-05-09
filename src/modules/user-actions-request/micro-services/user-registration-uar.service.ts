import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RegisterPayload, UserActionPayload, UserActionRequest, UserActionRequestStatus } from '../entity/user-actions-request.entity';
import { UpdateUserActionRequestStatusDto } from '../dto/update-user-action-request-status.dto';
import { User } from 'src/modules/auth/user/entity/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserRegistrationUARService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<User>,
    @InjectModel('UserActionRequest') private readonly requestModel: Model<UserActionRequest>,
  ) {}

  isRegisterPayload(payload: UserActionPayload): payload is RegisterPayload {
    return (payload as RegisterPayload).email !== undefined &&
           (payload as RegisterPayload).password !== undefined &&
           (payload as RegisterPayload).name !== undefined;
  }

  async handleStatusUpdate(
    request: UserActionRequest,
    dto: UpdateUserActionRequestStatusDto,
  ) {
    if (!request.payload || !this.isRegisterPayload(request.payload)) {
      throw new BadRequestException('Payload incompleto o no válido para crear usuario');
    }

    if (!request.payload.email || !request.payload.password) {
      throw new BadRequestException('Payload incompleto para crear usuario');
    }

    request.status = dto.status;
    request.responseMessage = dto.adminComment ?? null;
    await request.save();

    if (dto.status === UserActionRequestStatus.APPROVED) {
      const existing = await this.userModel.findOne({ email: request.payload.email });
      if (existing) {
        throw new BadRequestException('El usuario ya existe con este correo');
      }

      const hashedPassword = await bcrypt.hash(request.payload.password, 10);

      const user = new this.userModel({
        email: request.payload.email,
        password: hashedPassword,
        fullName: request.payload.name,
      });

      await user.save();

      return { message: 'Usuario creado exitosamente', user };
    }

    return { message: 'Solicitud actualizada sin crear usuario' };
  }
}
