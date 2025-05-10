import { Injectable } from "@nestjs/common";
import { INotificationDao } from "./db/notification.dao";
import { NotificationMongodbService } from "./db/notification-mongodb.service";
import { CreateNotificationDto } from "./dto/create-notification.dto";
import { Notification } from "./entity/notification.entity";

@Injectable()
export class NotificationService {

    private readonly _notificationDb: INotificationDao 

    constructor(
        private readonly notificationMongodbService: NotificationMongodbService
    ){
        this._notificationDb = this.notificationMongodbService;
    }

    async create(createNotification: CreateNotificationDto): Promise<Notification> {
        return await this._notificationDb.create(createNotification);
    };

    async getBrandUnreadNotifications(brandId: string): Promise<Notification[]> {
        return await this._notificationDb.getBrandUnreadNotifications(brandId);
    };

    async getBranchUnreadNotifications(branchId: string): Promise<Notification[]> {
        return await this._notificationDb.getBranchUnreadNotifications(branchId);
    };

    async markAsRead(id: string): Promise<Notification> {
        return await this._notificationDb.markAsRead(id);
    };

    async getUnreadNotifications(): Promise<Notification[]> {
        return await this._notificationDb.getUnreadNotifications();
    };

    async getNotificationsByCategory(category: string): Promise<Notification[]> {
        return await this._notificationDb.getNotificationsByCategory(category);
    };

}