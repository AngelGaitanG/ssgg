import { CreateNotificationDto } from "../dto/create-notification.dto"
import { Notification } from "../entity/notification.entity";

export interface INotificationDao {
    create(createNotification: CreateNotificationDto): Promise<Notification>
    getBrandUnreadNotifications(brandId: string): Promise<Notification[]>;
    getBranchUnreadNotifications(branchId: string): Promise<Notification[]>;
    markAsRead(id: string): Promise<Notification>;
    getUnreadNotifications(): Promise<Notification[]>;
    getNotificationsByCategory(category: string): Promise<Notification[]>;
}