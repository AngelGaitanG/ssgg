import { IsString } from "class-validator";

export enum NotificationType {
    GENERAL = 'general',
    SPECIFIC = 'specific',
}

export enum NotificationCategory {
    ORDER = 'orders',
    INVENTORY = 'inventory',
    USERS = 'users',
    PAYMENTS = 'payments',
    SYSTEM = 'system',
    CHATBOT = 'chatbot'
}

export enum NotificationPriority {
    HIGH = 'high',
    MEDIUM = 'medium',
    LOW = 'low',
}

