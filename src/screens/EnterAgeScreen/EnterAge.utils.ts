import {UserResponseDto} from 'api-client/api';
import {subYears} from 'date-fns';

export const getBirthday = (user: UserResponseDto | undefined) => {
  if (!user?.createdAt || !user.age) {
    return null;
  }

  return subYears(user.createdAt, user.age);
};
