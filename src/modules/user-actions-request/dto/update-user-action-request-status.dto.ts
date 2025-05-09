import { IsEnum, IsOptional, IsString, MaxLength } from 'class-validator';
import { UserActionRequestStatus } from '../entity/user-actions-request.entity';

export class UpdateUserActionRequestStatusDto {
  @IsEnum(UserActionRequestStatus)
  status: UserActionRequestStatus;

  @IsOptional()
  @IsString()
  @MaxLength(500)
  adminComment?: string;
}
