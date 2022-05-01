import mongoose from "mongoose";
import CourseBranch from "../../../enums/branch";
import JobDescription from "../../types/job-description.types/job-description.type";

mongoose.Schema.Types.String.set("trim", true);

const jobDescriptionSchema = new mongoose.Schema<JobDescription>({
    jobDescription: {
        type: String,
    },
    role: {
        type: String,
    },
    compensation: {
        type: String,
    },
    startDateTime: {
        type: Date,
    },
    branch: {
        type: String,
        enum: CourseBranch,
        default: CourseBranch.All,
    },
    placementTests: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "PlacementTest",
        },
    ],
    applicationLink: {
        type: String,
    },
    attachments: [
        {
            type: String,
        },
    ],
    deadline: {
        type: Date,
    },
});

jobDescriptionSchema.set("timestamps", true);
jobDescriptionSchema.set("toObject", { virtuals: true });

const ExperienceModel =
    mongoose.models.Experience ||
    mongoose.model("Experience", jobDescriptionSchema);

export default ExperienceModel;
