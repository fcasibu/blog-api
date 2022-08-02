import { AxiosError, AxiosResponse } from 'axios';

const ErrMessages = {
  NO_USER: 'User does not exist',
  INVALID_PASSWORD: 'Invalid Password'
};

export default function handleAuthError(err: AxiosError) {
  const response = err.response as AxiosResponse;
  switch (response.data.message) {
    case ErrMessages.NO_USER:
      return [{ param: 'email', msg: ErrMessages.NO_USER }];
    case ErrMessages.INVALID_PASSWORD:
      return [{ param: 'password', msg: ErrMessages.INVALID_PASSWORD }];
    default:
      return [];
  }
}
