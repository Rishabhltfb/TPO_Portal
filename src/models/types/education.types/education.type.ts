import { Types } from "mongoose";

export default interface Education {
    readonly _id?: Types.ObjectId;
    degree: string;
    collegeName: string;
    startDate: Date;
    endDate?: Date;
    percentage: number;
    readonly createdAt?: Date;
    readonly updatedAt?: Date;
}
