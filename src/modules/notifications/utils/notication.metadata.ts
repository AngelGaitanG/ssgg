import { NotificationCategory } from "../enums/notitication.enum";

// Metadata para notificaciones de CHATBOT
export interface ChatbotMetadata {
  phoneNumber: string;
  errorCode?: string;
  timestamp?: Date;
}

// Metadata para notificaciones de ORDER
export interface OrderMetadata {
  orderId: string;
  orderAmount?: number;
  clientId?: string;
  orderStatus?: string;
}

// Metadata para notificaciones de INVENTORY
export interface InventoryMetadata {
  productId: string;
  productName?: string;
  currentStock?: number;
  alertThreshold?: number;
}

// Metadata para notificaciones de USERS
export interface UsersMetadata {
  userId: string;
  userName?: string;
  userEmail?: string;
  action?: string;
}

// Metadata para notificaciones de PAYMENTS
export interface PaymentsMetadata {
  paymentId: string;
  amount?: number;
  status?: string;
  method?: string;
  orderId?: string;
}

// Metadata para notificaciones de SYSTEM
export interface SystemMetadata {
  eventType: string;
  errorMessage?: string;
  componentName?: string;
  serverInfo?: string;
}

// Mapa de tipos genérico para relacionar categorías con sus metadatos
export type NotificationMetadataMap = {
  [NotificationCategory.CHATBOT]: ChatbotMetadata;
  [NotificationCategory.ORDER]: OrderMetadata;
  [NotificationCategory.INVENTORY]: InventoryMetadata;
  [NotificationCategory.USERS]: UsersMetadata;
  [NotificationCategory.PAYMENTS]: PaymentsMetadata;
  [NotificationCategory.SYSTEM]: SystemMetadata;
}

// Tipo para usar en la entidad Notification
export type NotificationMetadata = 
  | ChatbotMetadata 
  | OrderMetadata 
  | InventoryMetadata 
  | UsersMetadata 
  | PaymentsMetadata 
  | SystemMetadata;

// Función ayudante para hacer casting de tipo seguro según la categoría
export function getTypedMetadata<T extends NotificationCategory>(
  category: T, 
  metadata: NotificationMetadata
): NotificationMetadataMap[T] {
  return metadata as NotificationMetadataMap[T];
} 