import { Types } from 'mongoose';
import CourseBranch from '../../../enums/branch';

export default interface JobDescription {
  readonly _id?: Types.ObjectId;
  jobDescription: string;
  role: string;
  compensation: string;
  startDateTime: Date;
  branch: CourseBranch;
  placementTests?: Array<Types.ObjectId>;
  applicationLink?: string;
  attachments?: Array<string>;
  readonly createdAt?: Date;
  readonly updatedAt?: Date;
  deadline?: Date;
}
