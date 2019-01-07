import {User} from "../../providers";





export interface Transaction {
  source: User,
  destination: string; //iban
  recipient: string;
  amount: number;
  type: string;
  date: string;
  reference: string;
}

export interface TransactionsRoot {
  transactions: Transaction[];
}
