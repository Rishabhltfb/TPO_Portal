import mongoose from 'mongoose';
import UserRole from '../../../enums/role';
import User from '../../types/user.types/user.type';

mongoose.Schema.Types.String.set('trim', true);

const userSchema = new mongoose.Schema<User>({
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  professionalEmail: {
    type: String,
  },
  enrollmentNumber: {
    type: String,
  },
  facultyNumber: {
    type: String,
  },
  passwordHash: {
    type: String,
  },
  role: {
    type: String,
    enum: UserRole,
    default: UserRole[UserRole.None],
  },
  profile: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Profile',
  },
});

userSchema.set('timestamps', true);
userSchema.set('toObject', { virtuals: true });

const UserModel = mongoose.models.User || mongoose.model('User', userSchema);

export default UserModel;
