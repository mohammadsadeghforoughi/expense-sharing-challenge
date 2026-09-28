import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { User } from '../users/user.entity';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { Balance, Expense } from './expense.entity';

type ExpenseRow = {
  id: number;
  amount_cents: number;
  description: string;
  created_at: string;
  payer_id: string;
  payer_name: string;
  payer_initials: string;
  payer_color: string;
  beneficiary_id: string;
  beneficiary_name: string;
  beneficiary_initials: string;
  beneficiary_color: string;
};

type BalanceRow = {
  payer_id: string;
  beneficiary_id: string;
  amount_cents: number;
};

@Injectable()
export class ExpensesService {
  constructor(private readonly database: DatabaseService) {}

  findAll(): Expense[] {
    const rows = this.database.db.prepare(`
      SELECT e.id, e.amount_cents, e.description, e.created_at,
             payer.id AS payer_id, payer.name AS payer_name,
             payer.initials AS payer_initials, payer.color AS payer_color,
             beneficiary.id AS beneficiary_id, beneficiary.name AS beneficiary_name,
             beneficiary.initials AS beneficiary_initials, beneficiary.color AS beneficiary_color
      FROM expenses e
      JOIN users payer ON payer.id = e.payer_id
      JOIN users beneficiary ON beneficiary.id = e.beneficiary_id
      ORDER BY e.created_at DESC, e.id DESC
    `).all() as ExpenseRow[];

    return rows.map((row) => this.mapExpense(row));
  }

  create(dto: CreateExpenseDto): Expense {
    if (dto.payerId === dto.beneficiaryId) {
      throw new BadRequestException('Payer and beneficiary must be different users.');
    }

    const count = this.database.db
      .prepare('SELECT COUNT(*) AS count FROM users WHERE id IN (?, ?)')
      .get(dto.payerId, dto.beneficiaryId) as { count: number };
    if (count.count !== 2) {
      throw new NotFoundException('One or both selected users do not exist.');
    }

    const amountCents = Math.round(dto.amount * 100);
    const result = this.database.db.prepare(`
      INSERT INTO expenses (payer_id, beneficiary_id, amount_cents, description, created_at)
      VALUES (?, ?, ?, ?, ?)
    `).run(
      dto.payerId,
      dto.beneficiaryId,
      amountCents,
      dto.description.trim(),
      new Date().toISOString(),
    );

    const row = this.findRowById(Number(result.lastInsertRowid));
    return this.mapExpense(row);
  }

  clear(): { deletedCount: number } {
    const result = this.database.db.prepare('DELETE FROM expenses').run();
    return { deletedCount: result.changes };
  }

  getBalances(): Balance[] {
    const users = this.database.db
      .prepare('SELECT id, name, initials, color FROM users')
      .all() as User[];
    const usersById = new Map(users.map((user) => [user.id, user]));
    const transactions = this.database.db
      .prepare('SELECT payer_id, beneficiary_id, amount_cents FROM expenses')
      .all() as BalanceRow[];

    const netByUser = new Map(users.map((user) => [user.id, 0]));
    for (const transaction of transactions) {
      netByUser.set(
        transaction.payer_id,
        (netByUser.get(transaction.payer_id) ?? 0) + transaction.amount_cents,
      );
      netByUser.set(
        transaction.beneficiary_id,
        (netByUser.get(transaction.beneficiary_id) ?? 0) - transaction.amount_cents,
      );
    }

    const creditors = [...netByUser.entries()]
      .filter(([, cents]) => cents > 0)
      .map(([id, cents]) => ({ id, cents }))
      .sort((a, b) => b.cents - a.cents || a.id.localeCompare(b.id));
    const debtors = [...netByUser.entries()]
      .filter(([, cents]) => cents < 0)
      .map(([id, cents]) => ({ id, cents: Math.abs(cents) }))
      .sort((a, b) => b.cents - a.cents || a.id.localeCompare(b.id));

    const settlements: Balance[] = [];
    let creditorIndex = 0;
    let debtorIndex = 0;

    while (creditorIndex < creditors.length && debtorIndex < debtors.length) {
      const creditor = creditors[creditorIndex];
      const debtor = debtors[debtorIndex];
      const cents = Math.min(creditor.cents, debtor.cents);

      settlements.push({
        debtor: usersById.get(debtor.id)!,
        creditor: usersById.get(creditor.id)!,
        amount: cents / 100,
      });

      creditor.cents -= cents;
      debtor.cents -= cents;
      if (creditor.cents === 0) creditorIndex += 1;
      if (debtor.cents === 0) debtorIndex += 1;
    }

    return settlements;
  }

  private findRowById(id: number): ExpenseRow {
    return this.database.db.prepare(`
      SELECT e.id, e.amount_cents, e.description, e.created_at,
             payer.id AS payer_id, payer.name AS payer_name,
             payer.initials AS payer_initials, payer.color AS payer_color,
             beneficiary.id AS beneficiary_id, beneficiary.name AS beneficiary_name,
             beneficiary.initials AS beneficiary_initials, beneficiary.color AS beneficiary_color
      FROM expenses e
      JOIN users payer ON payer.id = e.payer_id
      JOIN users beneficiary ON beneficiary.id = e.beneficiary_id
      WHERE e.id = ?
    `).get(id) as ExpenseRow;
  }

  private mapExpense(row: ExpenseRow): Expense {
    return {
      id: row.id,
      payer: {
        id: row.payer_id,
        name: row.payer_name,
        initials: row.payer_initials,
        color: row.payer_color,
      },
      beneficiary: {
        id: row.beneficiary_id,
        name: row.beneficiary_name,
        initials: row.beneficiary_initials,
        color: row.beneficiary_color,
      },
      amount: row.amount_cents / 100,
      description: row.description,
      createdAt: row.created_at,
    };
  }
}
