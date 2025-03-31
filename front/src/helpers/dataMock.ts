import { 
    UserType, 
    ServiceProfileType, 
    AppointmentType, 
    ReviewType, 
    OrderType, 
    mediaType, 
    CategoryType, 
    UserRole, 
    AppointmentStatus, 
    OrderStatus,
    SubscriptionStatus,
    SubscriptionType
} from './typeMock';

// Categorías
export const categoriesMock: CategoryType[] = [
    {
        id: "cat1",
        name: "Plomería",
        description: "Servicios profesionales de plomería",
        services: [],
        user: []
    },
    {
        id: "cat2",
        name: "Electricidad",
        description: "Servicios profesionales de electricidad",
        services: [],
        user: []
    },
    {
        id: "cat3",
        name: "Carpintería",
        description: "Servicios profesionales de carpintería",
        services: [],
        user: []
    },
    {
        id: "cat4",
        name: "Jardinería",
        description: "Servicios profesionales de jardinería",
        services: [],
        user: []
    },
    {
        id: "cat5",
        name: "Pintura",
        description: "Servicios profesionales de pintura",
        services: [],
        user: []
    }
];

// Media
export const mediaMock: mediaType[] = [
    { id: "img1", imgUrl: "https://example.com/service1.jpg" },
    { id: "img2", imgUrl: "https://example.com/service2.jpg" },
    { id: "img3", imgUrl: "https://example.com/service3.jpg" },
    { id: "img4", imgUrl: "https://example.com/service4.jpg" },
    { id: "img5", imgUrl: "https://example.com/service5.jpg" }
];

// Servicios
export const servicesMock: ServiceProfileType[] = [
    {
        id: "service1",
        user: null as any,
        appointments: [], 
        reviews: [], 
        name: "Servicio de Plomería Express",
        address: "Calle Principal 123, Ciudad",
        rating: 4.5,
        category: categoriesMock[0],
        description: "Servicio profesional de plomería con atención 24/7",
        price: 150,
        images: [mediaMock[0], mediaMock[1]], 
        subscription: null as any,
        orders: [], 
        createdAt: new Date(2025, 0, 1),
        updatedAt: new Date(2025, 0, 1),
        deletedAt: null
    },
    {
        id: "service2",
        user: null as any,
        appointments: [], 
        reviews: [], 
        name: "Electricista Profesional",
        address: "Avenida Central 456, Ciudad",
        rating: 4.8,
        category: categoriesMock[1],
        description: "Instalaciones y reparaciones eléctricas con garantía",
        price: 200,
        images: [mediaMock[1], mediaMock[2]], 
        subscription: null as any,
        orders: [], 
        createdAt: new Date(2025, 0, 2),
        updatedAt: new Date(2025, 0, 2),
        deletedAt: null
    },
    {
        id: "service3",
        user: null as any,
        appointments: [], 
        reviews: [], 
        name: "Carpintería Artesanal",
        address: "Plaza Mayor 789, Ciudad",
        rating: 4.7,
        category: categoriesMock[2],
        description: "Trabajos de carpintería fina y restauración",
        price: 250,
        images: [mediaMock[2], mediaMock[3]], 
        subscription: null as any,
        orders: [], 
        createdAt: new Date(2025, 0, 3),
        updatedAt: new Date(2025, 0, 3),
        deletedAt: null
    },
    {
        id: "service4",
        user: null as any,
        appointments: [], 
        reviews: [], 
        name: "Jardines y Paisajismo",
        address: "Calle Verde 321, Ciudad",
        rating: 4.6,
        category: categoriesMock[3],
        description: "Diseño y mantenimiento de jardines",
        price: 180,
        images: [mediaMock[3], mediaMock[4]], 
        subscription: null as any,
        orders: [], 
        createdAt: new Date(2025, 0, 4),
        updatedAt: new Date(2025, 0, 4),
        deletedAt: null
    },
    {
        id: "service5",
        user: null as any,
        appointments: [], 
        reviews: [], 
        name: "Pintura Profesional",
        address: "Avenida Color 654, Ciudad",
        rating: 4.9,
        category: categoriesMock[4],
        description: "Servicios de pintura interior y exterior",
        price: 220,
        images: [mediaMock[4], mediaMock[0]], 
        subscription: null as any,
        orders: [], 
        createdAt: new Date(2025, 0, 5),
        updatedAt: new Date(2025, 0, 5),
        deletedAt: null
    }
];

// Usuarios
export const usersMock: UserType[] = [
    {
        id: "user1",
        name: "Juan Pérez",
        email: "juan@example.com",
        password: "hashedPassword1",
        phone: "+123456701",
        address: "Calle Principal 123",
        role: UserRole.provider,
        interests: ["Plomería", "Electricidad", "Carpintería"],
        imgUrl: "https://example.com/profile1.jpg",
        services: servicesMock[0], 
        appointments: [], 
        reviews: [], 
        orders: [], 
        createdAt: new Date(2025, 0, 1),
        updatedAt: new Date(2025, 0, 1),
        deletedAt: null
    },
    {
        id: "user2",
        name: "María García",
        email: "maria@example.com",
        password: "hashedPassword2",
        phone: "+123456702",
        address: "Avenida Central 456",
        role: UserRole.provider,
        interests: ["Electricidad", "Carpintería", "Pintura"],
        imgUrl: "https://example.com/profile2.jpg",
        services: servicesMock[1], 
        appointments: [], 
        reviews: [], 
        orders: [], 
        createdAt: new Date(2025, 0, 2),
        updatedAt: new Date(2025, 0, 2),
        deletedAt: null
    },
    {
        id: "user3",
        name: "Carlos López",
        email: "carlos@example.com",
        password: "hashedPassword3",
        phone: "+123456703",
        address: "Plaza Mayor 789",
        role: UserRole.provider,
        interests: ["Carpintería", "Jardinería", "Pintura"],
        imgUrl: "https://example.com/profile3.jpg",
        services: servicesMock[2], 
        appointments: [], 
        reviews: [], 
        orders: [], 
        createdAt: new Date(2025, 0, 3),
        updatedAt: new Date(2025, 0, 3),
        deletedAt: null
    },
    {
        id: "user4",
        name: "Ana Martínez",
        email: "ana@example.com",
        password: "hashedPassword4",
        phone: "+123456704",
        address: "Calle Verde 321",
        role: UserRole.customer,
        interests: ["Jardinería", "Pintura", "Plomería"],
        imgUrl: "https://example.com/profile4.jpg",
        services: servicesMock[3], 
        appointments: [], 
        reviews: [], 
        orders: [], 
        createdAt: new Date(2025, 0, 4),
        updatedAt: new Date(2025, 0, 4),
        deletedAt: null
    },
    {
        id: "user5",
        name: "Pedro Rodríguez",
        email: "pedro@example.com",
        password: "hashedPassword5",
        phone: "+123456705",
        address: "Avenida Color 654",
        role: UserRole.customer,
        interests: ["Pintura", "Plomería", "Electricidad"],
        imgUrl: "https://example.com/profile5.jpg",
        services: servicesMock[4], 
        appointments: [], 
        reviews: [], 
        orders: [], 
        createdAt: new Date(2025, 0, 5),
        updatedAt: new Date(2025, 0, 5),
        deletedAt: null
    }
];

// Citas
export const appointmentsMock: AppointmentType[] = [
    {
        id: "appointment1",
        user: usersMock[3],
        service: servicesMock[0],
        date: new Date(2025, 3, 1),
        status: AppointmentStatus.pending,
        note: "Reparación de fuga en baño"
    },
    {
        id: "appointment2",
        user: usersMock[4],
        service: servicesMock[1],
        date: new Date(2025, 3, 2),
        status: AppointmentStatus.confirmed,
        note: "Instalación de luces LED"
    },
    {
        id: "appointment3",
        user: usersMock[3],
        service: servicesMock[2],
        date: new Date(2025, 3, 3),
        status: AppointmentStatus.canceled,
        note: "Reparación de puerta"
    },
    {
        id: "appointment4",
        user: usersMock[4],
        service: servicesMock[3],
        date: new Date(2025, 3, 4),
        status: AppointmentStatus.confirmed,
        note: "Mantenimiento de jardín"
    },
    {
        id: "appointment5",
        user: usersMock[3],
        service: servicesMock[4],
        date: new Date(2025, 3, 5),
        status: AppointmentStatus.pending,
        note: "Pintura de interiores"
    }
];

// Reseñas
export const reviewsMock: ReviewType[] = [
    {
        id: "review1",
        appointment: appointmentsMock[0],
        user: usersMock[3],
        service: servicesMock[0],
        rating: 5,
        comment: "Excelente servicio de plomería, muy profesional",
        createdAt: new Date(2025, 3, 2)
    },
    {
        id: "review2",
        appointment: appointmentsMock[1],
        user: usersMock[4],
        service: servicesMock[1],
        rating: 4,
        comment: "Buen trabajo con la instalación eléctrica",
        createdAt: new Date(2025, 3, 3)
    },
    {
        id: "review3",
        appointment: appointmentsMock[2],
        user: usersMock[3],
        service: servicesMock[2],
        rating: 5,
        comment: "Excelente trabajo de carpintería",
        createdAt: new Date(2025, 3, 4)
    },
    {
        id: "review4",
        appointment: appointmentsMock[3],
        user: usersMock[4],
        service: servicesMock[3],
        rating: 4,
        comment: "Muy buen servicio de jardinería",
        createdAt: new Date(2025, 3, 5)
    },
    {
        id: "review5",
        appointment: appointmentsMock[4],
        user: usersMock[3],
        service: servicesMock[4],
        rating: 5,
        comment: "Excelente trabajo de pintura",
        createdAt: new Date(2025, 3, 6)
    }
];

// Suscripciones
export const subscriptionsMock: SubscriptionType[] = [
    {
        id: "subscription1",
        service: servicesMock[0],
        premium: "premium", 
        status: SubscriptionStatus.active,
        startDate: new Date(2025, 3, 1),
        endDate: new Date(2025, 3, 30),
        createdAt: new Date(2025, 3, 1)
    },
    {
        id: "subscription2",
        service: servicesMock[1],
        premium: "premium", 
        status: SubscriptionStatus.pending,
        startDate: new Date(2025, 3, 2),
        endDate: new Date(2025, 3, 30),
        createdAt: new Date(2025, 3, 2)
    },
    {
        id: "subscription3",
        service: servicesMock[2],
        premium: "premium", 
        status: SubscriptionStatus.active,
        startDate: new Date(2025, 3, 3),
        endDate: new Date(2025, 3, 30),
        createdAt: new Date(2025, 3, 3)
    },
    {
        id: "subscription4",
        service: servicesMock[3],
        premium: "premium", 
        status: SubscriptionStatus.pending,
        startDate: new Date(2025, 3, 4),
        endDate: new Date(2025, 3, 30),
        createdAt: new Date(2025, 3, 4)
    },
    {
        id: "subscription5",
        service: servicesMock[4],
        premium: "premium", 
        status: SubscriptionStatus.active,
        startDate: new Date(2025, 3, 5),
        endDate: new Date(2025, 3, 30),
        createdAt: new Date(2025, 3, 5)
    }
];

// Órdenes
export const ordersMock: OrderType[] = [
    {
        id: "order1",
        subscription: subscriptionsMock[0],
        service: servicesMock[0],
        price: 150,
        invoice: 10001,
        status: OrderStatus.active,
        createdAt: new Date(2025, 3, 1)
    },
    {
        id: "order2",
        subscription: subscriptionsMock[1],
        service: servicesMock[1],
        price: 200,
        invoice: 10002,
        status: OrderStatus.pending,
        createdAt: new Date(2025, 3, 2)
    },
    {
        id: "order3",
        subscription: subscriptionsMock[2],
        service: servicesMock[2],
        price: 250,
        invoice: 10003,
        status: OrderStatus.active,
        createdAt: new Date(2025, 3, 3)
    },
    {
        id: "order4",
        subscription: subscriptionsMock[3],
        service: servicesMock[3],
        price: 180,
        invoice: 10004,
        status: OrderStatus.pending,
        createdAt: new Date(2025, 3, 4)
    },
    {
        id: "order5",
        subscription: subscriptionsMock[4],
        service: servicesMock[4],
        price: 220,
        invoice: 10005,
        status: OrderStatus.active,
        createdAt: new Date(2025, 3, 5)
    }
];
