import { mkdtempSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { DatabaseService } from '../src/database/database.service';
import { ExpensesService } from '../src/expenses/expenses.service';

describe('ExpensesService', () => {
  let directory: string;
  let database: DatabaseService;
  let service: ExpensesService;

  beforeEach(() => {
    directory = mkdtempSync(join(tmpdir(), 'expense-api-'));
    process.env.DATABASE_PATH = join(directory, 'test.db');
    database = new DatabaseService();
    database.onModuleInit();
    database.db.prepare('DELETE FROM expenses').run();
    service = new ExpensesService(database);
  });

  afterEach(() => {
    database.onModuleDestroy();
    delete process.env.DATABASE_PATH;
    rmSync(directory, { recursive: true, force: true });
  });

  it('nets reciprocal expenses between the same users', () => {
    service.create({ payerId: 'alice', beneficiaryId: 'bob', amount: 45, description: 'Dinner' });
    service.create({ payerId: 'bob', beneficiaryId: 'alice', amount: 35, description: 'Taxi' });

    expect(service.getBalances()).toEqual([
      expect.objectContaining({
        debtor: expect.objectContaining({ id: 'bob' }),
        creditor: expect.objectContaining({ id: 'alice' }),
        amount: 10,
      }),
    ]);
  });

  it('cancels a closed loop across three users', () => {
    service.create({ payerId: 'alice', beneficiaryId: 'bob', amount: 50, description: 'Alice covered Bob' });
    service.create({ payerId: 'david', beneficiaryId: 'alice', amount: 50, description: 'David covered Alice' });
    service.create({ payerId: 'bob', beneficiaryId: 'david', amount: 50, description: 'Bob covered David' });

    expect(service.getBalances()).toEqual([]);
  });

  it('produces final settlements from every user net position', () => {
    service.create({ payerId: 'alice', beneficiaryId: 'bob', amount: 100, description: 'Hotel' });
    service.create({ payerId: 'david', beneficiaryId: 'alice', amount: 60, description: 'Train' });

    expect(service.getBalances()).toEqual([
      expect.objectContaining({
        debtor: expect.objectContaining({ id: 'bob' }),
        creditor: expect.objectContaining({ id: 'david' }),
        amount: 60,
      }),
      expect.objectContaining({
        debtor: expect.objectContaining({ id: 'bob' }),
        creditor: expect.objectContaining({ id: 'alice' }),
        amount: 40,
      }),
    ]);
  });
});
