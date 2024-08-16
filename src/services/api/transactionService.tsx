import {IResponse} from '../../models/interfaces/response';
import {ITransaction} from '../../models/interfaces/transaction';
import {apiClient} from './apiClient';

const url = '/transaction';

const getTransactions = async (): Promise<IResponse<ITransaction[]>> => {
  try {
    const {data} = await apiClient.get<ITransaction[]>(`${url}`);
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

export {getTransactions};
