import { Types } from 'mongoose';
import CourseBranch from '../../../enums/branch';
import JobType from '../../../enums/job-type';

export default interface JobDescriptionUpdate {
  _id: Types.ObjectId;
  jobDescription?: string;
  role?: string;
  compensation?: string;
  startDateTime?: Date;
  branch?: CourseBranch;
  placementTests?: Array<Types.ObjectId>;
  applicationLink?: string;
  attachments?: Array<string>;
  deadline?: Date;
  jobType?: JobType;
  minCpi?: number;
  threads?: Array<Types.ObjectId>;
}
