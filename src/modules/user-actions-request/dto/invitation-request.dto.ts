import { IsEmail, IsOptional, IsString } from 'class-validator';

export class InvitationRequestDto {
  @IsEmail()
  invitedEmail: string;

  @IsOptional()
  @IsString()
  role?: string;
}