
import { IsMongoId, IsOptional, IsString } from 'class-validator';

export class FriendRequestDto {
  @IsMongoId()
  targetUserId: string;

  @IsOptional()
  @IsString()
  message?: string;
}