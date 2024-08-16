import {TransactionType} from '../enums/transaction-type';

export interface ITransaction {
  _id: string;
  to: string;
  from: string;
  amount: number;
  type: TransactionType;
  tags: string[];
  description: string;
}
