export enum UserRole {
    customer = "customer",
    provider = "provider",
    admin = "admin",
    superadmin = "superadmin"
}

export enum SubscriptionStatus {
    pending = "pending",
    active = "active",
    canceled = "canceled"
}

export enum OrderStatus {
    pending = "pending",
    active = "active",
    canceled = "canceled"
}

export enum AppointmentStatus {
    pending = "pending",
    confirmed = "confirmed",
    canceled = "canceled"
}

export type UserType = {
    id: string;
    name: string;
    email: string;
    password: string;
    phone: string;
    address: string;
    role: UserRole;
    interests: string[];
    imgUrl: string | null;
    services: ServiceProfileType;
    appointments: AppointmentType[];
    reviews: ReviewType[];
    orders: OrderType[];
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
}

export type ServiceProfileType = {
    id: string;
    user: string;
    userId: string;
    appointments: AppointmentType[];
    reviews: ReviewType[];
    name: string;
    address: string;
    rating: number;
    category: CategoryType;
    description: string;
    price: number;
    images: mediaType[];
    subscription: SubscriptionType;
    orders: OrderType[];
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
}

export type mediaType = {
    id: string;
    imgUrl: string;
}

export type CategoryType = {
    id: string;
    name: string;
    description: string;
    services: ServiceProfileType[];
    user: UserType[];
}

export type AppointmentType = {
    id: string;
    user: UserType;
    service: ServiceProfileType;
    date: Date;
    status: AppointmentStatus;
    note: string;
}

export type ReviewType = {
    id: string;
    appointment: AppointmentType;
    user: UserType;
    service: ServiceProfileType;
    rating: number;
    comment: string;
    createdAt: Date;
}

export type SubscriptionType = {
    id: string;
    service: ServiceProfileType;
    premium: "free" | "premium";
    status: SubscriptionStatus;
    startDate: Date;
    endDate: Date;
    createdAt: Date;
}

export type OrderType = {
    id: string;
    subscription: SubscriptionType;
    service: ServiceProfileType;
    price: number;
    invoice: number;
    status: OrderStatus;
    createdAt: Date;
}