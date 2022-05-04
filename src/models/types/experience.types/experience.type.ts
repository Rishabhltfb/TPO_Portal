import { Types } from 'mongoose';

export default interface Experience {
  readonly _id?: Types.ObjectId;
  company: string;
  role: string;
  description: string;
  skills: Array<string>;
  startDate: Date;
  endDate?: Date;
  certificateLink?: string;
  readonly createdAt?: Date;
  readonly updatedAt?: Date;
}
