import mongoose from "mongoose";
import Experience from "../../types/experience.types/experience.type";

mongoose.Schema.Types.String.set("trim", true);

const experienceSchema = new mongoose.Schema<Experience>({
    company: {
        type: String,
    },
    role: {
        type: String,
    },
    description: {
        type: String,
    },
    skills: [
        {
            type: String,
        },
    ],
    startDate: {
        type: Date,
    },
    endDate: {
        type: Date,
    },
    certificateLink: {
        type: String,
    },
});

experienceSchema.set("timestamps", true);
experienceSchema.set("toObject", { virtuals: true });

const ExperienceModel =
    mongoose.models.Experience ||
    mongoose.model("Experience", experienceSchema);

export default ExperienceModel;
