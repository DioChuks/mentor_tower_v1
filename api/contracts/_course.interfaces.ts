import { Types } from "mongoose";

export interface IReview {
    user: Types.ObjectId;
    comment: string;
    rating: number;
}

export interface ICourse {
    title: string;
    about: string;
    price: number;
    image: string;
    reviews: IReview[];
}