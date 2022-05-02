import { Types } from 'mongoose';
import PlacementDriveRequestStatus from '../../../enums/placement-drive-request-status';

export default interface PlacementDriveRequest {
  readonly _id?: Types.ObjectId;
  companyName: string;
  companyEmail: string;
  companyNumber: string;
  verified: boolean;
  status: PlacementDriveRequestStatus;
  placementDrive?: Types.ObjectId;
  readonly createdAt?: Date;
  readonly updatedAt?: Date;
  rejectionFeedback?: string;
}
