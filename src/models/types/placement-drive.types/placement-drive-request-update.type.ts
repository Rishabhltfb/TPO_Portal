import { Types } from 'mongoose';
import PlacementDriveRequestStatus from '../../../enums/placement-drive-request-status';

export default interface PlacementDriveRequestUpdate {
  readonly id: Types.ObjectId;
  verified?: boolean;
  status: PlacementDriveRequestStatus;
  placementDrive?: Types.ObjectId;
  rejectionFeedback?: string;
}
