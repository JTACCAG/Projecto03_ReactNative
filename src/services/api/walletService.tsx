import {IResponse} from '../../models/interfaces/response';
import {IWallet} from '../../models/interfaces/wallet';
import {apiClient} from './apiClient';

const url = '/wallet';

const walletByUser = async (): Promise<IResponse<IWallet>> => {
  try {
    const {data} = await apiClient.get<IWallet>(`${url}/byUser`);
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

export {walletByUser};
