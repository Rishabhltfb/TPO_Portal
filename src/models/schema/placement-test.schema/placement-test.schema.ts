import mongoose, { Types } from "mongoose";
import PlacementTest from "../../types/placement-test.types/placement-test.type";

mongoose.Schema.Types.String.set("trim", true);

const placementTestSchema = new mongoose.Schema<PlacementTest>({
    placementDrive: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "PlacementDrive",
    },
    testName: {
        type: String,
    },
    testDescription: {
        type: String,
    },
    testTime: {
        type: Date,
    },
    testResult: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "PlacementTestResult",
    },
});

placementTestSchema.set("timestamps", true);
placementTestSchema.set("toObject", { virtuals: true });

const PlacementTestModel =
    mongoose.models.PlacementTest ||
    mongoose.model("PlacementTest", placementTestSchema);

export default PlacementTestModel;
