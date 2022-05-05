import { Mongoose, Types } from 'mongoose';
// import logger from '../../config/logger';
import GenericError from '../../models/dto/generic/generic-error';
import PlacementDriveModel from '../../models/schema/placement-drive.schema/placment-drive.schema';
import PlacementDrive from '../../models/types/placement-drive.types/placement-drive.type';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const mongoose = new Mongoose();

export default class PlacementDriveDAO {
  async createPlacementDrive(placementDrive: PlacementDrive): Promise<PlacementDrive> {
    try {
      const placementDriveDao = new PlacementDriveModel(placementDrive);
      return placementDriveDao.save();
    } catch (err) {
      throw new GenericError('Request Timeout here', 408);
    }
  }

  async deletePlacementDrive(placementDriveId: Types.ObjectId): Promise<void> {
    try {
      await PlacementDriveModel.deleteOne({
        _id: placementDriveId,
      });
    } catch (err) {
      throw new GenericError('Request Timeout here', 408);
    }
  }
  async getPlacementDriveById(placementDriveId: Types.ObjectId): Promise<PlacementDrive> {
    try {
      const placementDrive = await PlacementDriveModel.findById({
        _id: placementDriveId,
      });
      return placementDrive;
    } catch (err) {
      throw new GenericError('Request Timeout here', 408);
    }
  }

  async getAllVisiblePlacementDrives(): Promise<Array<PlacementDrive>> {
    try {
      const results = await PlacementDriveModel.find({ visible: true }).sort({ createdAt: -1 }).exec();
      return results;
    } catch (err) {
      throw new GenericError('Request Timeout here', 408);
    }
  }

  async getAllPlacementDrives(): Promise<Array<PlacementDrive>> {
    try {
      const results = await PlacementDriveModel.find().sort({ createdAt: -1 }).exec();
      return results;
    } catch (err) {
      throw new GenericError('Request Timeout here', 408);
    }
  }
}
