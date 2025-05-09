
import { IsNotEmpty, IsString } from 'class-validator';

export class AccessRequestDto {
  @IsNotEmpty()
  @IsString()
  resource: string;

  @IsNotEmpty()
  @IsString()
  reason: string;
}
