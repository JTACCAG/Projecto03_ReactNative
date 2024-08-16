import {ISignInResponse} from './sign-in.response';

export interface IAuthContext {
  isLoading: boolean;
  isLoggedIn: boolean;
  login: (access: ISignInResponse) => void | Promise<void>;
  logout: () => void | Promise<void>;
}
