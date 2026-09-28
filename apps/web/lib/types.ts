export type User = {
  id: string;
  name: string;
  initials: string;
  color: string;
};

export type Expense = {
  id: number;
  payer: User;
  beneficiary: User;
  amount: number;
  description: string;
  createdAt: string;
};

export type Balance = {
  debtor: User;
  creditor: User;
  amount: number;
};

export type Locale = 'en' | 'fa';
