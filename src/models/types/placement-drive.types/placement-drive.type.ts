import { Types } from 'mongoose';

export default interface PlacementDrive {
  readonly _id?: Types.ObjectId;
  companyName: string;
  companyEmail: string;
  companyNumber: string;
  jobDescription: Array<Types.ObjectId>;
  readonly createdAt?: Date;
  readonly updatedAt?: Date;
}
