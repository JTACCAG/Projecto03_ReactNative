import {createContext} from 'react';
import {ISignInResponse} from '../../models/interfaces/sign-in.response';

export interface IAuthContext {
  isLoading: boolean;
  login: (access: ISignInResponse) => Promise<void>;
  isLoggedIn: boolean;
  logout: () => Promise<void>;
}
const AuthContext = createContext<IAuthContext>({
  isLoading: false,
  isLoggedIn: false,
  login: () => Promise.resolve(),
  logout: () => Promise.resolve(),
});

export {AuthContext};
