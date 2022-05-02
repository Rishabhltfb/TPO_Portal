import { Types } from 'mongoose';
import UserRole from '../../../enums/role';

export default interface User {
  readonly _id?: Types.ObjectId;
  name: string;
  email: string;
  professionalEmail: string;
  enrollmentNumber: string;
  facultyNumber: string;
  readonly role: UserRole;
  readonly passwordHash: string;
  readonly createdAt?: Date;
  readonly updatedAt?: Date;
  profile?: Types.ObjectId;
}
