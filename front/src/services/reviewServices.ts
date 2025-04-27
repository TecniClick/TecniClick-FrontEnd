// src/services/reviewService.ts

import { ReviewType } from "@/helpers/typeMock";

const BASE_URL = `${process.env.NEXT_PUBLIC_API_URL}/reviews`;

export const createReview = async (
    appointmentId: string,
    reviewData: { rating: number; comment: string },
    token: string
): Promise<ReviewType> => {
    const res = await fetch(`${BASE_URL}/${appointmentId}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(reviewData)
    });

    if (!res.ok) {
        throw new Error("Error al crear la review");
    }

    return res.json();
};

export const getReviewsByServiceProfile = async (
    serviceProfileId: string
): Promise<ReviewType[]> => {
    const res = await fetch(`${BASE_URL}/service-profile/${serviceProfileId}`, {
        credentials: "include",
    });

    if (!res.ok) {
        throw new Error("Error al obtener las reviews");
    }

    return res.json();
};
