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
        name: "Plomero",
        description: "Servicios profesionales de plomeria",
        services: [],
        user: []
    },
    {
        id: "cat2",
        name: "Electricista",
        description: "Servicios profesionales de electricidad",
        services: [],
        user: []
    },
    {
        id: "cat3",
        name: "Gasista",
        description: "Servicios profesionales de gas",
        services: [],
        user: []
    },
    {
        id: "cat4",
        name: "Carpintero",
        description: "Servicios profesionales de carpintería",
        services: [],
        user: []
    },
    {
        id: "cat5",
        name: "Mecánico",
        description: "Servicios profesionales de mecánica",
        services: [],
        user: []
    },
    {
        id: "cat6",
        name: "Jardinero",
        description: "Servicios profesionales de jardinería",
        services: [],
        user: []
    },
    {
        id: "cat7",
        name: "Servicio de limpieza",
        description: "Servicios de limpieza y mantenimiento del hogar",
        services: [],
        user: []
    },
    {
        id: "cat8",
        name: "Albañil",
        description: "Servicios profesionales de albañilería",
        services: [],
        user: []
    },
    {
        id: "cat9",
        name: "Instalador de baños",
        description: "Servicios de instalación y reparación de baños",
        services: [],
        user: []
    },
    {
        id: "cat10",
        name: "Pintor",
        description: "Servicios profesionales de pintura",
        services: [],
        user: []
    },
    {
        id: "cat11",
        name: "Reparador de electrodomésticos",
        description: "Servicios de reparación y mantenimiento de electrodomésticos",
        services: [],
        user: []
    },
    {
        id: "cat12",
        name: "Técnico en celulares",
        description: "Reparación y mantenimiento de celulares",
        services: [],
        user: []
    },
    {
        id: "cat13",
        name: "Técnico informático",
        description: "Soporte y mantenimiento de equipos informáticos",
        services: [],
        user: []
    },
    {
        id: "cat14",
        name: "Instalador de antenas",
        description: "Servicios de instalación y mantenimiento de antenas",
        services: [],
        user: []
    },
    {
        id: "cat15",
        name: "Chef",
        description: "Servicios profesionales de cocina",
        services: [],
        user: []
    },
    {
        id: "cat16",
        name: "Chofer",
        description: "Servicios de transporte y conducción",
        services: [],
        user: []
    },
    {
        id: "cat17",
        name: "Profesor particular",
        description: "Clases particulares de diversas materias",
        services: [],
        user: []
    },
    {
        id: "cat18",
        name: "Niñera",
        description: "Cuidado de niños y asistencia familiar",
        services: [],
        user: []
    }
];


// Media
export const mediaMock: mediaType[] = [
    { id: "img1", imgUrl: "https://resizer.iproimg.com/unsafe/1280x/filters:format(webp):quality(85)/https://assets.iprofesional.com/assets/jpg/2019/08/482892.jpg" },
    { id: "img2", imgUrl: "https://economis.com.ar/wp-content/uploads/2024/03/plomero.jpg.webp" },
    { id: "img3", imgUrl: "https://media.istockphoto.com/id/1372761173/es/foto/joven-embarazada-pintando-sala-de-guarder%C3%ADa.jpg?s=612x612&w=0&k=20&c=eydfddfwPqo8-fc6kAWKTcNw-IkYYPYMEJ3b4FGPYJA=" },
    { id: "img4", imgUrl: "https://www.indomio.es/news/app/uploads/2024/06/7-tonos-azules-para-pintar-las-paredes-de-tu-casa-768x432.jpeg" },
    { id: "img5", imgUrl: "https://ait.org.ar/wp-content/uploads/2024/12/electricista-trabajando.jpg" },
    { id: "img6", imgUrl: "https://electricistasadomicilio24horas.com/wp-content/uploads/2024/11/electricista-650x434.webp" },
    { id: "img7", imgUrl: "https://medac.es/sites/default/files/styles/img_blog_big/public/blog/destacadas/C%C3%B3mo%20ser%20electricista.jpg?itok=N7Sp1z5c" },
];

// Servicios
export const servicesMock: ServiceProfileType[] = [
    {
        id: "service1",
        user: "Raul Perez",
        userId: "user1",
        appointments: [],
        reviews: [],
        title: "Servicio de Plomería Express",
        address: "Calle Principal 123, Ciudad",
        rating: 4.5,
        category: categoriesMock[0],
        description: "Servicio profesional de plomeria con atención 24/7",
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
        user: "Carlos Gomez",
        userId: "user",
        appointments: [],
        reviews: [],
        title: "Reparación de tuberías",
        address: "Avenida Central 456, Ciudad",
        rating: 4.7,
        category: categoriesMock[0],
        description: "Solución rápida y garantizada para fugas y roturas",
        price: 180,
        images: [mediaMock[1], mediaMock[2]],
        subscription: null as any,
        orders: [],
        createdAt: new Date(2025, 0, 2),
        updatedAt: new Date(2025, 0, 2),
        deletedAt: null
    },
    {
        id: "service3",
        user: "Andres Lopez",
        userId: "user1",
        appointments: [],
        reviews: [],
        title: "Instalación de sanitarios",
        address: "Calle Nueva 789, Ciudad",
        rating: 4.6,
        category: categoriesMock[0],
        description: "Montaje profesional de lavabos, inodoros y más",
        price: 200,
        images: [mediaMock[2], mediaMock[3]],
        subscription: null as any,
        orders: [],
        createdAt: new Date(2025, 0, 3),
        updatedAt: new Date(2025, 0, 3),
        deletedAt: null
    },
    {
        id: "service4",
        user: "Luis Fernandez",
        userId: "user3",
        appointments: [],
        reviews: [],
        title: "Electricista a domicilio",
        address: "Pasaje 12, Ciudad",
        rating: 4.8,
        category: categoriesMock[1],
        description: "Instalaciones y reparaciones eléctricas con garantía",
        price: 220,
        images: [mediaMock[4], mediaMock[5], mediaMock[6]],
        subscription: null as any,
        orders: [],
        createdAt: new Date(2025, 0, 4),
        updatedAt: new Date(2025, 0, 4),
        deletedAt: null
    },
    {
        id: "service5",
        user: "Miguel Sanchez",
        userId: "user1",
        appointments: [],
        reviews: [],
        title: "Mantenimiento de cableado",
        address: "Zona Industrial 22, Ciudad",
        rating: 4.9,
        category: categoriesMock[1],
        description: "Optimización y reparación de cableado eléctrico",
        price: 250,
        images: [mediaMock[4], mediaMock[0]],
        subscription: null as any,
        orders: [],
        createdAt: new Date(2025, 0, 5),
        updatedAt: new Date(2025, 0, 5),
        deletedAt: null
    },
    {
        id: "service6",
        user: "Pedro Ramirez",
        userId: "user1",
        appointments: [],
        reviews: [],
        title: "Instalación de paneles solares",
        address: "Barrio Solar 99, Ciudad",
        rating: 4.7,
        category: categoriesMock[1],
        description: "Energía renovable para tu hogar u oficina",
        price: 300,
        images: [mediaMock[0], mediaMock[1]],
        subscription: null as any,
        orders: [],
        createdAt: new Date(2025, 0, 6),
        updatedAt: new Date(2025, 0, 6),
        deletedAt: null
    },

    {
        id: "service7",
        user: "Carlos Gómez",
        userId: "user1",
        appointments: [],
        reviews: [],
        title: "Instalación de gas domiciliario",
        address: "Calle Fuego 45, Ciudad",
        rating: 4.2,
        category: categoriesMock[2],
        description: "Instalación y reparación de redes de gas.",
        price: 180,
        images: [mediaMock[3], mediaMock[4]],
        subscription: null as any,
        orders: [],
        createdAt: new Date(2025, 0, 7),
        updatedAt: new Date(2025, 0, 7),
        deletedAt: null
    },
    {
        id: "service8",
        user: "Lucía Fernández",
        userId: "user1",
        appointments: [],
        reviews: [],
        title: "Reparaciones de carpintería",
        address: "Avenida Madera 78, Ciudad",
        rating: 4.7,
        category: categoriesMock[3],
        description: "Reparación y mantenimiento de muebles y estructuras de madera.",
        price: 220,
        images: [mediaMock[4], mediaMock[5]],
        subscription: null as any,
        orders: [],
        createdAt: new Date(2025, 0, 8),
        updatedAt: new Date(2025, 0, 8),
        deletedAt: null
    },
    {
        id: "service9",
        user: "Pedro Sánchez",
        userId: "user1",
        appointments: [],
        reviews: [],
        title: "Mantenimiento mecánico de autos",
        address: "Calle Motores 99, Ciudad",
        rating: 4.6,
        category: categoriesMock[4],
        description: "Servicio de mantenimiento preventivo y correctivo de vehículos.",
        price: 300,
        images: [mediaMock[5], mediaMock[6]],
        subscription: null as any,
        orders: [],
        createdAt: new Date(2025, 0, 9),
        updatedAt: new Date(2025, 0, 9),
        deletedAt: null
    },
    {
        id: "service10",
        user: "Ana Ramírez",
        userId: "user1",
        appointments: [],
        reviews: [],
        title: "Cuidado de jardines",
        address: "Avenida Verde 23, Ciudad",
        rating: 4.8,
        category: categoriesMock[5],
        description: "Poda, riego y diseño de jardines.",
        price: 160,
        images: [mediaMock[6], mediaMock[7]],
        subscription: null as any,
        orders: [],
        createdAt: new Date(2025, 0, 10),
        updatedAt: new Date(2025, 0, 10),
        deletedAt: null
    },
    {
        id: "service11",
        user: "Fernando López",
        userId: "user1",
        appointments: [],
        reviews: [],
        title: "Servicio de limpieza integral",
        address: "Calle Limpieza 56, Ciudad",
        rating: 4.3,
        category: categoriesMock[6],
        description: "Limpieza de casas, oficinas y edificios.",
        price: 140,
        images: [mediaMock[7], mediaMock[8]],
        subscription: null as any,
        orders: [],
        createdAt: new Date(2025, 0, 11),
        updatedAt: new Date(2025, 0, 11),
        deletedAt: null
    },
    {
        id: "service12",
        user: "Beatriz Herrera",
        userId: "user1",
        appointments: [],
        reviews: [],
        title: "Construcción de muros y paredes",
        address: "Avenida Concreto 31, Ciudad",
        rating: 4.5,
        category: categoriesMock[7],
        description: "Construcción y reparación de estructuras de albañilería.",
        price: 280,
        images: [mediaMock[8], mediaMock[9]],
        subscription: null as any,
        orders: [],
        createdAt: new Date(2025, 0, 12),
        updatedAt: new Date(2025, 0, 12),
        deletedAt: null
    },
    {
        id: "service13",
        user: "Hugo Martínez",
        userId: "user1",
        appointments: [],
        reviews: [],
        title: "Instalación de sanitarios",
        address: "Calle Agua 74, Ciudad",
        rating: 4.6,
        category: categoriesMock[8],
        description: "Instalación y reparación de sanitarios y grifería.",
        price: 200,
        images: [mediaMock[9], mediaMock[0]],
        subscription: null as any,
        orders: [],
        createdAt: new Date(2025, 0, 13),
        updatedAt: new Date(2025, 0, 13),
        deletedAt: null
    },
    {
        id: "service14",
        user: "Marta Díaz",
        userId: "user2",
        appointments: [],
        reviews: [],
        title: "Pintura de interiores",
        address: "Avenida Color 321, Ciudad",
        rating: 4.9,
        category: categoriesMock[9],
        description: "Pintura de casas, oficinas y locales comerciales.",
        price: 190,
        images: [mediaMock[2], mediaMock[3]],
        subscription: null as any,
        orders: [],
        createdAt: new Date(2025, 0, 14),
        updatedAt: new Date(2025, 0, 14),
        deletedAt: null
    },
    {
        id: "service15",
        user: "Ana López",
        userId: "user1",
        appointments: [],
        reviews: [],
        title: "Instalación de Antenas",
        address: "Calle Antenas 15, Ciudad",
        rating: 4.3,
        category: categoriesMock[13],
        description: "Instalación de antenas para TV y señal satelital",
        price: 180,
        images: [mediaMock[3], mediaMock[4]],
        subscription: null as any,
        orders: [],
        createdAt: new Date(2025, 0, 15),
        updatedAt: new Date(2025, 0, 15),
        deletedAt: null
    },
    {
        id: "service16",
        user: "Carlos Martínez",
        userId: "user1",
        appointments: [],
        reviews: [],
        title: "Reparación de Electrodomésticos",
        address: "Calle Reparaciones 25, Ciudad",
        rating: 4.6,
        category: categoriesMock[11],
        description: "Reparación de electrodomésticos y aparatos electrónicos",
        price: 220,
        images: [mediaMock[0], mediaMock[1]],
        subscription: null as any,
        orders: [],
        createdAt: new Date(2025, 0, 16),
        updatedAt: new Date(2025, 0, 16),
        deletedAt: null
    },
    {
        id: "service17",
        user: "Sofía Ruiz",
        userId: "user1",
        appointments: [],
        reviews: [],
        title: "Servicio de Pintura Interior",
        address: "Avenida Color 30, Ciudad",
        rating: 4.8,
        category: categoriesMock[4],
        description: "Pintura profesional de interiores, con acabados de alta calidad",
        price: 250,
        images: [mediaMock[2], mediaMock[3]],
        subscription: null as any,
        orders: [],
        createdAt: new Date(2025, 0, 17),
        updatedAt: new Date(2025, 0, 17),
        deletedAt: null
    },
    {
        id: "service18",
        user: "Julio González",
        userId: "user1",
        appointments: [],
        reviews: [],
        title: "Servicio de Carpintería a Medida",
        address: "Plaza Carpinteros 12, Ciudad",
        rating: 4.7,
        category: categoriesMock[3],
        description: "Carpintería a medida para muebles, puertas y ventanas",
        price: 300,
        images: [mediaMock[4], mediaMock[0]],
        subscription: null as any,
        orders: [],
        createdAt: new Date(2025, 0, 18),
        updatedAt: new Date(2025, 0, 18),
        deletedAt: null
    },
    {
        id: "service19",
        user: "Pedro Díaz",
        userId: "user1",
        appointments: [],
        reviews: [],
        title: "Servicio de Plomería de Emergencia",
        address: "Calle Agua 50, Ciudad",
        rating: 4.9,
        category: categoriesMock[0],
        description: "Servicio urgente de plomería para resolver problemas de fontanería",
        price: 350,
        images: [mediaMock[3], mediaMock[1]],
        subscription: null as any,
        orders: [],
        createdAt: new Date(2025, 0, 19),
        updatedAt: new Date(2025, 0, 19),
        deletedAt: null
    },
    {
        id: "service20",
        user: "Patricia González",
        userId: "user1",
        appointments: [],
        reviews: [],
        title: "Instalación de Baños",
        address: "Calle de los Baños 25, Ciudad",
        rating: 4.4,
        category: categoriesMock[9],
        description: "Instalación y reparación de sistemas de baños, incluyendo duchas y lavabos",
        price: 280,
        images: [mediaMock[2], mediaMock[4]],
        subscription: null as any,
        orders: [],
        createdAt: new Date(2025, 0, 20),
        updatedAt: new Date(2025, 0, 20),
        deletedAt: null
    }
]

// Usuarios
export const usersMock: UserType[] = [
    {
        id: "user1",
        name: "Raul Pérez",
        email: "Raul@example.com",
        password: "hashedPassword1",
        phone: "+123456701",
        address: "Calle Principal 123",
        role: UserRole.provider,
        interests: ["Plomería", "Electricidad", "Carpintería"],
        imgUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2J6z_ttRcwLFMPSUoYGnwYJZ_t_Z-p4HNDA&s",
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
        name: "Marta Diaz",
        email: "marta@example.com",
        password: "hashedPassword2",
        phone: "+123456702",
        address: "Avenida Central 456",
        role: UserRole.provider,
        interests: ["Pintor", "Carpintería"],
        imgUrl: "https://img.freepik.com/vector-premium/constructor-lindo-pincel-rodillos-cubo-pintura-personaje-pintora-nina-sombrero-duro-mono-azul-herramientas-construccion-ilustracion-vectorial-estilo-dibujos-animados_178650-40214.jpg?w=740",
        services: servicesMock[13],
        appointments: [],
        reviews: [],
        orders: [],
        createdAt: new Date(2025, 0, 2),
        updatedAt: new Date(2025, 0, 2),
        deletedAt: null
    },
    {
        id: "user3",
        name: "Luis Fernandez",
        email: "luis@example.com",
        password: "hashedPassword3",
        phone: "+123456703",
        address: "Plaza Mayor 789",
        role: UserRole.provider,
        interests: ["Electricidad", "Jardinería", "Pintura"],
        imgUrl: "https://www.yotesalvo.com/wp-content/uploads/2024/10/tecnico-electricista-a-domicilio.png.webp",
        services: servicesMock[3],
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
        imgUrl: "",
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
        imgUrl: "",
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
