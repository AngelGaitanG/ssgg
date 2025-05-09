// import { Controller, Patch, Param, Get, UseGuards, Req, Body, Post } from '@nestjs/common';
// import { NotificationService } from './notification.service';
// import { AuthGuard } from 'src/auth/guards/auth.guard';
// import { AuthenticatedRequest } from 'src/auth/user/interface/auth.interface';
// import { ApiResponse } from 'src/shared/models';
// import { NotificationCategory, notificationParamsDto } from './notificationType.enum';
// import { CreateNotificationDto } from './dto/create-notification.dto';

// @Controller('notifications')
// export class NotificationController {
//     constructor(private readonly notificationService: NotificationService) {}

//     @UseGuards(AuthGuard)
//     @Post()
//     async createNotification(@Body() createNotificationDto: CreateNotificationDto) {
//         return this.notificationService.createNotification(createNotificationDto);
//     }

//     @UseGuards(AuthGuard)
//     @Patch(':id/read')
//     async markAsRead(@Param('id') notificationId: string) {
//         return this.notificationService.markAsRead(notificationId);
//     }

//     @UseGuards(AuthGuard)
//     @Get('unread/:subDomain/:localId')
//     async getUnreadNotifications(@Param() params: notificationParamsDto): Promise<ApiResponse> {
//         return this.notificationService.getUnreadNotifications(params.subDomain, params.localId);
//     }

//     @UseGuards(AuthGuard)
//     @Get('category/:category/:subDomain/:localId')
//     async getNotificationsByCategory(@Param('category') category: NotificationCategory, @Param('subDomain') subDomain: string, @Param('localId') localId: string): Promise<ApiResponse> {
//         return this.notificationService.getNotificationsByCategory(category, subDomain, localId);
//     }
// } 
