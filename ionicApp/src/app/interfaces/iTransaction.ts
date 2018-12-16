import {User} from "../../providers";





export interface Transaction {
  source: User,
  iban: string;
  description: string;
  bookingDate: string;
  amount: number;
  recipient: string;
  execMode: string;
}

export interface TransactionsRoot {
  transactions: Transaction[];
}
