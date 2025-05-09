import { Order } from "../entity/order.entity"

export interface IOrderDao {

    create(createOrder: Order):Promise<Order>;

    createAlsoInRestaurantpe(createOrder: Order):Promise<Order>;

    findByBrand(brandId: string) :Promise<Order[]>;

    findByBranch(branchId: string): Promise<Order[]>;

    findById(id: string): Promise<Order>;

    archivateOrder(id: string, status: Partial<Order>): Promise<Order>;

}