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
    service = new ExpensesService(database);
  });

  afterEach(() => {
    database.onModuleDestroy();
    delete process.env.DATABASE_PATH;
    rmSync(directory, { recursive: true, force: true });
  });

  it('nets reciprocal expenses between the same users', () => {
    service.create({ payerId: 'alice', beneficiaryId: 'bob', amount: 25, description: 'Taxi' });
    service.create({ payerId: 'bob', beneficiaryId: 'alice', amount: 10, description: 'Coffee' });

    const aliceBob = service.getBalances().find(({ debtor, creditor }) =>
      [debtor.id, creditor.id].includes('alice') && [debtor.id, creditor.id].includes('bob'),
    );

    expect(aliceBob).toMatchObject({
      debtor: { id: 'alice' },
      creditor: { id: 'bob' },
      amount: 105,
    });
  });
});
