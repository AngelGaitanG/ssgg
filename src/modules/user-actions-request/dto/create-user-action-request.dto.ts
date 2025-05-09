import { IsEnum, IsObject, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { UserActionRequestType } from '../entity/user-actions-request.entity';
import { RegisterUserRequestDto } from './register-user-request.dto';
import { FriendRequestDto } from './friend-request.dto';
import { AccessRequestDto } from './access-request.dto';
import { InvitationRequestDto } from './invitation-request.dto';
import { ReportRequestDto } from './report-request.dto';

export class CreateUserActionRequestDto {
  @IsEnum(UserActionRequestType)
  type: UserActionRequestType;

  @IsObject()
  @ValidateNested()
  @Type((options) => {
    switch (options?.object?.type) {
      case UserActionRequestType.REGISTER:
        return RegisterUserRequestDto;
      case UserActionRequestType.FRIEND_REQUEST:
        return FriendRequestDto;
      case UserActionRequestType.ACCESS:
        return AccessRequestDto;
      case UserActionRequestType.INVITATION:
        return InvitationRequestDto;
      case UserActionRequestType.REPORT:
        return ReportRequestDto;
      default:
        return Object;
    }
  })
  payload: RegisterUserRequestDto | FriendRequestDto | AccessRequestDto | InvitationRequestDto | ReportRequestDto;
}
