import { Injectable, NotFoundException } from "@nestjs/common";
import { INotificationDao } from "./notification.dao";
import { CreateNotificationDto } from "../dto/create-notification.dto";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Branch } from "src/modules/businesses/branch/entity/branch.entity";
import { Brand } from "src/modules/businesses/brand/entity/brand.entity";
import { Notification } from "../entity/notification.entity";
import { NotificationCategory } from "../enums/notitication.enum";

@Injectable()
export class NotificationMongodbService implements INotificationDao {

    constructor(
        @InjectModel(Notification.name) private notificationModel: Model<Notification>,
        @InjectModel(Branch.name) private branchModel: Model<Branch>,
        @InjectModel(Brand.name) private brandModel: Model<Brand>
    ){}

    async create(createNotification: CreateNotificationDto): Promise<Notification> {
        return await this.notificationModel.create(createNotification);
    }

    async markAsRead(notificationId: string): Promise<Notification> {
        return await this.notificationModel.findByIdAndUpdate(notificationId, { isRead: true }, { new: true }).exec();
    }

    async getBranchUnreadNotifications(branchId: string): Promise<Notification[]> {
        const branch = await this.branchModel.findById(branchId);
        if(!branch) throw new NotFoundException('Sucursal no encontrada');
        return await this.notificationModel.find({branchId})
    }

    async getBrandUnreadNotifications(brandId: string): Promise<Notification[]> {
        const brand = await this.brandModel.findById(brandId);
        if(!brand) throw new NotFoundException('Marca no encontrada');
        return await this.notificationModel.find({brandId})
    }

    async getNotificationsByCategory(category: NotificationCategory): Promise<Notification[]> {
        return await this.notificationModel.find({ category })
    }

    async getUnreadNotifications(): Promise<Notification[]> {
        return await this.notificationModel.find({ isRead: false })
    }
    
}