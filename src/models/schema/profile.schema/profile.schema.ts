import mongoose from 'mongoose';
import CourseBranch from '../../../enums/branch';
import Gender from '../../../enums/gender';
import Profile from '../../types/profile.types/profile.type';

mongoose.Schema.Types.String.set('trim', true);

const profileSchema = new mongoose.Schema<Profile>({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  resume: {
    type: String,
  },
  session: {
    type: Number,
  },
  contactNumber: {
    type: String,
  },
  about: {
    type: String,
  },
  linkedin: {
    type: String,
  },
  socialLinks: [
    {
      type: String,
    },
  ],
  gender: {
    type: String,
    enum: Gender,
    default: Gender[Gender.NotProvided],
  },

  achievements: {
    type: String,
  },
  skills: [
    {
      type: String,
    },
  ],
  experiences: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Experience',
    },
  ],
  branch: {
    type: CourseBranch,
    enum: CourseBranch,
    default: CourseBranch[CourseBranch.None],
  },
  Education: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Education',
    },
  ],
});

profileSchema.set('timestamps', true);
profileSchema.set('toObject', { virtuals: true });

const ProfileModel = mongoose.models.Profile || mongoose.model('Profile', profileSchema);

export default ProfileModel;
