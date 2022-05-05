import { Mongoose, Types } from 'mongoose';
// import logger from '../../config/logger';
import PlacementDriveDAO from '../../data/placement-drive.dao/placement-drive.dao';
import Errors from '../../enums/errors';
import GenericError from '../../models/dto/generic/generic-error';
import PlacementDrive from '../../models/types/placement-drive.types/placement-drive.type';

const mongoose = new Mongoose();

export default class PlacementDriveService {
  private placementDriveDAO = new PlacementDriveDAO();

  async createPlacementDrive(placementDrive: PlacementDrive): Promise<PlacementDrive> {
    try {
      return this.placementDriveDAO.createPlacementDrive(placementDrive);
    } catch (err) {
      if (err instanceof mongoose.Error.CastError) {
        throw new GenericError(Errors.PLACEMENT_DRIVE_NOT_FOUND_ERR, 404);
      } else {
        throw err;
      }
    }
  }
  async deletePlacementDrive(placementDriveId: Types.ObjectId): Promise<void> {
    try {
      this.placementDriveDAO.deletePlacementDrive(placementDriveId);
    } catch (err) {
      if (err instanceof mongoose.Error.CastError) {
        throw new GenericError(Errors.PLACEMENT_DRIVE_NOT_FOUND_ERR, 404);
      } else {
        throw err;
      }
    }
  }
  async getPlacementDriveById(placementDriveId: Types.ObjectId): Promise<PlacementDrive> {
    try {
      return this.placementDriveDAO.getPlacementDriveById(placementDriveId);
    } catch (err) {
      if (err instanceof mongoose.Error.CastError) {
        throw new GenericError('No placement drive using this id', 404);
      } else {
        throw err;
      }
    }
  }
}
