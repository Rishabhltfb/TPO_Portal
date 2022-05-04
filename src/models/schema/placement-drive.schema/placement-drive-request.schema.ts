import mongoose, { Types } from "mongoose";
import PlacementDriveRequestStatus from "../../../enums/placement-drive-request-status";
import PlacementDriveRequest from "../../types/placement-drive.types/placment-drive-request.type";

mongoose.Schema.Types.String.set("trim", true);

const placementDriveRequestSchema = new mongoose.Schema<PlacementDriveRequest>({
    companyName: {
        type: String,
        required: true,
    },
    companyEmail: {
        type: String,
        required: true,
    },
    companyNumber: {
        type: String,
        required: true,
    },
    verified: {
        type: Boolean,
        default: false,
    },
    status: {
        type: String,
        enum: PlacementDriveRequestStatus,
        default: PlacementDriveRequestStatus[PlacementDriveRequestStatus.Open],
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
