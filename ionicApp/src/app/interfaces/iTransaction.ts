export interface Amount {
  value: number;
  currency: string;
}

export interface RelatedParty {
  name: string;
}

export interface Transaction {
  iban: string;
  description: string;
  bookingDate: Date;
  amount: Amount;
  relatedParty: RelatedParty;
}

export interface TransactionsRoot {
  transactions: Transaction[];
}
