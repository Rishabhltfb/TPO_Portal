import { Mongoose, Types } from 'mongoose';
import logger from '../../config/logger';
import PlacementDriveRequestDAO from '../../data/placement-drive.dao/placement-drive-request.dao';
import PlacementDriveDAO from '../../data/placement-drive.dao/placement-drive.dao';
import Errors from '../../enums/errors';
import PlacementDriveRequestStatus from '../../enums/placement-drive-request-status';
import GenericError from '../../models/dto/generic/generic-error';
import PlacementDriveRequestUpdate from '../../models/types/placement-drive.types/placement-drive-request-update.type';
import PlacementDrive from '../../models/types/placement-drive.types/placement-drive.type';
import PlacementDriveRequest from '../../models/types/placement-drive.types/placment-drive-request.type';

const mongoose = new Mongoose();
export default class PlacementDriveRequestService {
  private placementDriveRequestDAO = new PlacementDriveRequestDAO();
  private placementDriveDAO = new PlacementDriveDAO();

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

  async updatePlacementDriveRequest(
    placementDriveRequestUpdate: PlacementDriveRequestUpdate,
  ): Promise<PlacementDriveRequest> {
    const res = await this.placementDriveRequestDAO.updatePlacementDriveRequest(placementDriveRequestUpdate);
    // Create new placement Drive
    // logger.info(PlacementDriveRequestStatus[placementDriveRequestUpdate.status]);
    if (
      res.status.toString() !== 'Approved' &&
      PlacementDriveRequestStatus[placementDriveRequestUpdate.status].toString() === 'Approved'
    ) {
      const placementDrive: PlacementDrive = {
        companyName: res.companyName,
        companyNumber: res.companyNumber,
        companyEmail: res.companyEmail,
        visible: false,
        jobDescription: [],
      };
      logger.info(res);
      await this.placementDriveDAO.createPlacementDrive(placementDrive);
    }
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
