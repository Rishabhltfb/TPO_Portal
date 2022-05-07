import { Types } from 'mongoose';
// import logger from '../../config/logger';
import PlacementDriveDAO from '../../data/placement-drive.dao/placement-drive.dao';
import PlacementDriveUpdate from '../../models/types/placement-drive.types/placement-drive-update.type';
// import Errors from '../../enums/errors';
// import GenericError from '../../models/dto/generic/generic-error';
import PlacementDrive from '../../models/types/placement-drive.types/placement-drive.type';

// const mongoose = new Mongoose();

export default class PlacementDriveService {
  private placementDriveDAO = new PlacementDriveDAO();

  async createPlacementDrive(placementDrive: PlacementDrive): Promise<PlacementDrive> {
    return await this.placementDriveDAO.createPlacementDrive(placementDrive);
  }
  async deletePlacementDrive(placementDriveId: Types.ObjectId): Promise<void> {
    await this.placementDriveDAO.deletePlacementDrive(placementDriveId);
  }
  async getPlacementDriveById(placementDriveId: Types.ObjectId): Promise<PlacementDrive> {
    return await this.placementDriveDAO.getPlacementDriveById(placementDriveId);
  }
  async getAllVisiblePlacementDrives(): Promise<Array<PlacementDrive>> {
    return await this.placementDriveDAO.getAllVisiblePlacementDrives();
  }
  async getAllPlacementDrives(): Promise<Array<PlacementDrive>> {
    return await this.placementDriveDAO.getAllPlacementDrives();
  }

  async updatePlacementDrive(placementDriveUpdate: PlacementDriveUpdate): Promise<boolean> {
    return await this.placementDriveDAO.updatePlacementDrive(placementDriveUpdate);
  }
}
