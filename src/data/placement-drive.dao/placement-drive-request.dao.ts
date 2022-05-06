import { Mongoose } from 'mongoose';
import logger from '../../config/logger';
import PlacementDriveRequestStatus from '../../enums/placement-drive-request-status';
import GenericError from '../../models/dto/generic/generic-error';
import PlacementDriveRequestModel from '../../models/schema/placement-drive.schema/placement-drive-request.schema';
import PlacementDriveRequestUpdate from '../../models/types/placement-drive.types/placement-drive-request-update.type';
import PlacementDriveRequest from '../../models/types/placement-drive.types/placment-drive-request.type';
import LooseObject from '../../models/types/universal.type';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const mongoose = new Mongoose();
export default class PlacementDriveRequestDAO {
  async createPlacementDriveRequest(placementDriveRequest: PlacementDriveRequest): Promise<boolean> {
    const placementDriveRequestDao = new PlacementDriveRequestModel(placementDriveRequest);
    return placementDriveRequestDao.save();
  }

  async updatePlacementDriveRequest(placementDriveRequestUpdate: PlacementDriveRequestUpdate): Promise<boolean> {
    const updateObj: LooseObject = {};
    if (placementDriveRequestUpdate.status) {
      updateObj.status = PlacementDriveRequestStatus[placementDriveRequestUpdate.status];
    }
    if (placementDriveRequestUpdate.verified) {
      updateObj.verified = placementDriveRequestUpdate.verified;
    }
    if (placementDriveRequestUpdate.rejectionFeedback) {
      updateObj.rejectionFeedback = placementDriveRequestUpdate.rejectionFeedback;
    }

    PlacementDriveRequestModel.updateOne(
      { _id: placementDriveRequestUpdate.id },
      {
        $set: updateObj,
      },
    ).catch((err) => {
      logger.error(err);
    });
    return Promise.resolve(true);
  }

  async placementDriveRequestsByStatus(status: PlacementDriveRequestStatus): Promise<Array<PlacementDriveRequest>> {
    const statusStr: string = PlacementDriveRequestStatus[status];
    try {
      const requests = await PlacementDriveRequestModel.find({
        status: statusStr,
      });
      return requests;
    } catch (err) {
      throw new GenericError('Request Timeout here', 408);
    }
  }
}
