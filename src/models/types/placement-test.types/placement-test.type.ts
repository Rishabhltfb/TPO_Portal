import { Types } from "mongoose";

export default interface PlacementTest {
    readonly _id?: Types.ObjectId;
    placementDrive: Types.ObjectId;
    testName: string;
    testDescription: string;
    testTime: Date;
    testResult?: Types.ObjectId;
    readonly createdAt?: Date;
    readonly updatedAt?: Date;
}
