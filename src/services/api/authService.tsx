import {IResponse} from '../../models/interfaces/response';
import {ISignInResponse} from '../../models/interfaces/sign-in.response';
import {apiClient} from './apiClient';

const url = '/authentication';
const routesAuth = {
  signIn: `${url}/sign-in`,
  refreshToken: `${url}/refresh-tokens`,
};

const authSignIn = async (
  email: string,
  password: string,
): Promise<IResponse<ISignInResponse>> => {
  try {
    const {data} = await apiClient.post<ISignInResponse>(
      `${routesAuth.signIn}`,
      {
        email,
        password,
      },
    );
    return {
      success: true,
      data: data,
    };
  } catch (error: any) {
    return {
      success: false,
      ...error?.response?.data,
    };
  }
};

const authRefreshToken = async (
  token: string,
): Promise<IResponse<ISignInResponse>> => {
  try {
    const {data} = await apiClient.post<ISignInResponse>(
      `${routesAuth.refreshToken}`,
      {
        token,
      },
    );
    return {
      success: true,
      data: data,
    };
  } catch (error: any) {
    return {
      success: false,
      ...error?.response?.data,
    };
  }
};

export {authSignIn, authRefreshToken, routesAuth};
