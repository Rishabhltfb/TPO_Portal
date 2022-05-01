import { Mongoose } from "mongoose";
import PlacementDriveRequestModel from "../../models/schema/placement-drive.schema/placement-drive-request.schema";
import PlacementDriveRequest from "../../models/types/placement-drive.types/placment-drive-request.type";

const mongoose = new Mongoose();
export default class PlacementDriveRequestDAO {
    async createPlacementDriveRequest(
        placementDriveRequest: PlacementDriveRequest
    ): Promise<boolean> {
        const placementDriveRequestDao = new PlacementDriveRequestModel(
            placementDriveRequest
        );
        return placementDriveRequestDao.save();
    }

    async getAllUnapprovedPlacementDriveRequests(): Promise<
        Array<PlacementDriveRequest>
    > {
        const requests: Array<PlacementDriveRequest> =
            await PlacementDriveRequestModel.find({ status: "OPEN" });
        return requests;
    }
}
