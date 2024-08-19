import {IResponse} from '../../models/interfaces/response';
import {IUser} from '../../models/interfaces/user';
import {apiClient} from './apiClient';

const url = '/user';

const GetUsers = async (): Promise<IResponse<IUser[]>> => {
  try {
    const {data} = await apiClient.get<IUser[]>(`${url}`);
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

export {GetUsers};
