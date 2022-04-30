import mongoose from "mongoose";
import UserRole from "../../../enums/role";
import User from "../../types/user.types/user.type";

mongoose.Schema.Types.String.set("trim", true);

const userSchema = new mongoose.Schema<User>({
    degree: {
        type: String,
    },
    collegeName: {
        type: String,
    },
    startDate: {
        type: Date,
    },
    endDate: {
        type: Date,
    },
    percentage: {
        type: Number,
    },
});

userSchema.set("timestamps", true);
userSchema.set("toObject", { virtuals: true });

const UserModel = mongoose.models.User || mongoose.model("User", userSchema);

export default UserModel;
