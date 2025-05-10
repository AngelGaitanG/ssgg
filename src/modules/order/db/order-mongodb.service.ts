import { Injectable } from "@nestjs/common";
import { IOrderDao } from "./order.dao";
import { InjectModel } from "@nestjs/mongoose";
import { Order } from "../entity/order.entity";
import { Model } from "mongoose";

@Injectable()
export class OrderMongodbService implements IOrderDao {
    constructor(
        @InjectModel(Order.name) private orderModel: Model<Order>
    ){}

    create(createOrder: Order): Promise<Order> {
        return this.orderModel.create(createOrder);
    }

    createAlsoInRestaurantpe(createOrder: Order): Promise<Order> {
        return this.orderModel.create(createOrder)
    }

    findByBranch(branchId: string): Promise<Order[]> {
        return this.orderModel.find({ branchId });
    }

    findByBrand(brandSubdomain: string): Promise<Order[]> {
        return this.orderModel.find({ brandSubdomain })
    }

    findById(id: string): Promise<Order> {
        return this.orderModel.findById(id);
    }

    archivateOrder(id: string, status: Partial<Order>): Promise<Order> {
        return this.orderModel.findByIdAndUpdate(id, status)
    }
}