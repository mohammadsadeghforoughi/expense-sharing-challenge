import type { Balance, Expense, User } from './types';

const API_URL = process.env.NEXT_PUBLIC_API_URL || '/api';

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: { 'Content-Type': 'application/json', ...options?.headers },
    cache: 'no-store',
  });

  if (!response.ok) {
    throw new Error(`API request failed with ${response.status}`);
  }

  return response.json() as Promise<T>;
}

export const api = {
  users: () => request<User[]>('/users'),
  expenses: () => request<Expense[]>('/expenses'),
  balances: () => request<Balance[]>('/balances'),
  createExpense: (payload: {
    payerId: string;
    beneficiaryId: string;
    amount: number;
    description: string;
  }) => request<Expense>('/expenses', { method: 'POST', body: JSON.stringify(payload) }),
  clearExpenses: () => request<{ deletedCount: number }>('/expenses', { method: 'DELETE' }),
};
