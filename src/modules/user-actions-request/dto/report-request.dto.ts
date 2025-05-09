import { IsMongoId, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class ReportRequestDto {
  @IsMongoId()
  reportedUserId: string;

  @IsNotEmpty()
  @IsString()
  reason: string;

  @IsOptional()
  evidenceUrls?: string[];
}