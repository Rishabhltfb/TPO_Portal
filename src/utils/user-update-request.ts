import User from '../models/types/user.types/user.type';
import UserUpdateRequest from '../models/types/user.types/user-update-request.type';

export default class UserRequestConverter {
  userUpdateRequestToUser(userUpdateRequest: UserUpdateRequest): Promise<UserUpdateRequest> {
    const user: UserUpdateRequest = {
      _id: userUpdateRequest._id,
      name: userUpdateRequest.name ?? '',
      passwordHash: userUpdateRequest.passwordHash,
      email: userUpdateRequest.email,
    };
    return Promise.resolve(user);
  }

  UserToUserUpdateRequest(user: User): Promise<UserUpdateRequest> {
    const userUpdateRequest: UserUpdateRequest = {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      _id: user._id!,
      name: user.name,
      email: user.email,
      passwordHash: user.passwordHash,
    };
    return Promise.resolve(userUpdateRequest);
  }
}
