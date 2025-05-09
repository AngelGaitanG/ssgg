import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Customer } from 'src/modules/customer/entity/customer.entity';
import { OrderSource, INTEGRATION_STATUS, OrderStatus } from '../enum/order-status';
import { PriceStrategy } from '../enum/order-status';

@Schema()
export class ModificatorSelection extends Document {
  @Prop({ type: String, required: true })
  modificatorId: string;

  @Prop({ type: String, required: true })
  modGroupName: string;

  @Prop({ type: String, required: true })
  modificatorSelectionId: string;

  @Prop({ type: String, required: true })
  modName: string;
  @Prop({ type: String })
  modificatorSelectionName: string;

  @Prop({ type: Number, required: true })
  price: number;

  @Prop({ type: Number, required: true })
  quantity: number;
}

@Schema()
export class ProductItem extends Document {
  @Prop({ type: String, required: true })
  productId: string;

  @Prop({ type: String, required: true })
  itemName: string;

  @Prop({ type: Number, required: true })
  quantity: number;

  @Prop({ type: Number, required: true })
  price: number;

  @Prop({ type: Number, default: 0 })
  discount: number;

  @Prop({ type: String })
  note: string;

  @Prop({ type: String, required: true })
  isCombo: string;

  @Prop()
  typeComboPrice: PriceStrategy;

  @Prop({ type: [SchemaFactory.createForClass(ModificatorSelection)] })
  modificatorSelectionList: ModificatorSelection[];

  @Prop({ type: mongoose.Schema.Types.Mixed })
  comboProductList: ProductItem[];

  @Prop({ type: mongoose.Schema.Types.Mixed })
  additionalListAdded: ProductItem[];
}

@Schema()
export class DeliveryDetails extends Document {
  @Prop({ type: Number, required: true })
  cost: number;

  @Prop({ type: Number, required: true })
  paymentAmount: number;

  @Prop({ type: Number, default: 0 })
  discountAmount: number;

  @Prop({ type: Number, required: true })
  paymentType: number;

  @Prop({ type: String })
  cardId: string;

  @Prop({ type: Number, required: true })
  mode: number;

  @Prop({ type: String })
  reference: string;

  @Prop({ type: String })
  voucherUrl: string;

  @Prop({ type: String, required: true })
  referencePerson: string;

  @Prop({ type: String })
  generalNote: string;

  @Prop({ type: String })
  pickupPerson: string;

  @Prop({ type: Date, required: false, default: null })
  pickupTime: Date;

  @Prop({ type: Date, required: false, default: null })
  deliveryTime: Date;

  @Prop({ type: Date })
  endTime: Date;

  @Prop({ type: Number, required: true })
  alertMinutes: number;

  @Prop({ type: Number, required: true })
  receipt: number;

  @Prop({ type: String })
  billingName: string;

  @Prop({ type: String })
  billingAddress: string;

  @Prop({ type: String })
  code: string;
  //TODO: cambiar a required true cuando se tenga el valor de la latitud y longitud
  @Prop({ type: String, required: false })
  latitude: string;

  @Prop({ type: String, required: false })
  longitude: string;
}

@Schema({ timestamps: true })
export class Order extends Document {
  @Prop({ type: String, required: true })
  brandSubdomain: string;

  @Prop({ type: String, required: true })
  branchId: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Customer', required: true })
  client: Customer;

  @Prop({ type: [SchemaFactory.createForClass(ProductItem)] })
  productList: ProductItem[];

  @Prop({ type: String, enum: OrderStatus, default: OrderStatus.ACEPTED })
  status: OrderStatus;

  @Prop({ type: SchemaFactory.createForClass(DeliveryDetails) })
  delivery: DeliveryDetails;

  @Prop({ type: Number, enum: OrderSource, required: true })
  orderSource: OrderSource;

  @Prop({ type: String })
  externalId: string;

  @Prop({ type: Boolean, default: false })
  isArchived: boolean;

  @Prop({ type: String, nullable: true })
  statusReason: string;

  @Prop({
    type: String,
    enum: Object.values(INTEGRATION_STATUS),
    default: INTEGRATION_STATUS.NONE,
  })
  integrationStatus: INTEGRATION_STATUS;

  @Prop({ type: Date })
  createdAt: Date;

  @Prop({ type: Date })
  updatedAt: Date;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
