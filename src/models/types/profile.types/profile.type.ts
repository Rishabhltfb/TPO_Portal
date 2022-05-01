import { Types } from "mongoose";
import CourseBranch from "../../../enums/branch";
import Gender from "../../../enums/gender";

export default interface Profile {
    readonly _id?: Types.ObjectId;
    user: Types.ObjectId;
    gender: Gender;
    resume: string;
    branch: CourseBranch;
    session: number;
    contactNumber: string;
    about: string;
    linkedin: string;
    socialLinks: Array<string>;
    achievements: string;
    skills: Array<string>;
    experiences: Array<Types.ObjectId>;
    Education: Array<Types.ObjectId>;
    readonly createdAt?: Date;
    readonly updatedAt?: Date;
}
