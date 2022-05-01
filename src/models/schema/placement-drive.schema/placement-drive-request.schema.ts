import mongoose, { Types } from "mongoose";
import PlacementDriveRequestStatus from "../../../enums/placement-drive-request-status";
import PlacementDriveRequest from "../../types/placement-drive.types/placment-drive-request.type";

mongoose.Schema.Types.String.set("trim", true);

const placementDriveRequestSchema = new mongoose.Schema<PlacementDriveRequest>({
    companyName: {
        type: String,
    },
    companyEmail: {
        type: String,
    },
    companyNumber: {
        type: String,
    },
    verified: {
        type: Boolean,
    },
    status: {
        type: PlacementDriveRequestStatus,
    },
    placementDrive: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "PlacementDrive",
    },
    rejectionFeedback: {
        type: String,
    },
});

placementDriveRequestSchema.set("timestamps", true);
placementDriveRequestSchema.set("toObject", { virtuals: true });

const PlacementDriveRequestModel =
    mongoose.models.PlacementDriveRequest ||
    mongoose.model("PlacementDriveRequest", placementDriveRequestSchema);

export default PlacementDriveRequestModel;
