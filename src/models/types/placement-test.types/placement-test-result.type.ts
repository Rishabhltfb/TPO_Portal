import { Types } from "mongoose";

export default interface PlacementTestResult {
    readonly _id?: Types.ObjectId;
    placementTest: Types.ObjectId;
    selectedStudents: Array<Types.ObjectId>;
    readonly createdAt?: Date;
    readonly updatedAt?: Date;
}
