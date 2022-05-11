import { Types } from 'mongoose';

export default interface Thread {
  readonly _id?: Types.ObjectId;
  jobDescription: Types.ObjectId;
  readonly createdAt?: Date;
  readonly updatedAt?: Date;
  threadText: string;
}
