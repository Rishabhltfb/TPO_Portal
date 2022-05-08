import { Mongoose } from 'mongoose';
import logger from '../../config/logger';
import PlacementDriveRequestDAO from '../../data/placement-drive.dao/placement-drive-request.dao';
import Errors from '../../enums/errors';
import PlacementDriveRequestStatus from '../../enums/placement-drive-request-status';
import GenericError from '../../models/dto/generic/generic-error';
import PlacementDriveRequestUpdate from '../../models/types/placement-drive.types/placement-drive-request-update.type';
import PlacementDriveRequest from '../../models/types/placement-drive.types/placment-drive-request.type';

const mongoose = new Mongoose();
export default class PlacementDriveRequestService {
  private placementDriveRequestDAO = new PlacementDriveRequestDAO();

  async createPlacementDriveRequest(placementDriveRequest: PlacementDriveRequest): Promise<boolean> {
    try {
      if (!this.validateEmail(placementDriveRequest.companyEmail) || placementDriveRequest.companyName.length < 3) {
        throw new GenericError(Errors.INVALID_REQUEST_ERROR, 400);
      }

      return this.placementDriveRequestDAO.createPlacementDriveRequest(placementDriveRequest);
    } catch (err) {
      if (err instanceof mongoose.Error.CastError) {
        throw new GenericError(Errors.PLACEMENT_REQUEST_NOT_FOUND_ERR, 404);
      } else {
        throw err;
      }
    }
  }

  async updatePlacementDriveRequest(placementDriveRequestUpdate: PlacementDriveRequestUpdate): Promise<boolean> {
    const res = await this.placementDriveRequestDAO.updatePlacementDriveRequest(placementDriveRequestUpdate);
    return res;
  }

  async placementDriveRequestsByStatus(status: PlacementDriveRequestStatus): Promise<Array<PlacementDriveRequest>> {
    const res = await this.placementDriveRequestDAO.placementDriveRequestsByStatus(status);
    return res;
  }
  async getPlacementDriveRequestById(placementDriveId: Types.ObjectId): Promise<PlacementDriveRequest> {
    const res = await this.placementDriveRequestDAO.getPlacementDriveRequestById(placementDriveId);
    return res;
  }

  validateEmail(email: string): boolean {
    const re =
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    const validate: boolean = re.test(email.toLowerCase());
    logger.info(`Email Validation: ${validate} with email: ${email}`);
    return validate;
  }
}
