import { IsEnum, IsMongoId, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';
import { NotificationType, NotificationPriority, NotificationCategory } from '../enums/notitication.enum';
import { NotificationMetadata } from '../utils/notication.metadata';

export class CreateNotificationDto {
  @IsString()
  @IsNotEmpty()
  message: string;

  @IsEnum(NotificationType)
  @IsNotEmpty()
  type: NotificationType;

  @IsEnum(NotificationPriority)
  @IsNotEmpty()
  priority: NotificationPriority;

  @IsEnum(NotificationCategory)
  @IsNotEmpty()
  category: NotificationCategory;

  @IsString()
  @IsOptional()
  brandId?: string;

  @IsString()
  @IsOptional()
  branchId?: string;

  @IsOptional()
  @Type(() => Object)
  metadata?: NotificationMetadata;
} 