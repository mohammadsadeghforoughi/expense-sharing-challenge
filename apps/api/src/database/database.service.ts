import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import Database from 'better-sqlite3';
import { dirname, resolve } from 'node:path';
import { mkdirSync } from 'node:fs';

@Injectable()
export class DatabaseService implements OnModuleInit, OnModuleDestroy {
  private database!: Database.Database;

  onModuleInit() {
    const configuredPath = process.env.DATABASE_PATH || './data/expenses.db';
    const databasePath = resolve(configuredPath);
    mkdirSync(dirname(databasePath), { recursive: true });
    this.database = new Database(databasePath);
    this.database.pragma('journal_mode = WAL');
    this.database.pragma('foreign_keys = ON');
    this.migrate();
    this.seed();
  }

  onModuleDestroy() {
    this.database?.close();
  }

  get db(): Database.Database {
    return this.database;
  }

  private migrate() {
    this.database.exec(`
      CREATE TABLE IF NOT EXISTS users (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL UNIQUE,
        initials TEXT NOT NULL,
        color TEXT NOT NULL
      );

      CREATE TABLE IF NOT EXISTS expenses (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        payer_id TEXT NOT NULL REFERENCES users(id),
        beneficiary_id TEXT NOT NULL REFERENCES users(id),
        amount_cents INTEGER NOT NULL CHECK(amount_cents > 0),
        description TEXT NOT NULL,
        created_at TEXT NOT NULL DEFAULT (datetime('now')),
        CHECK(payer_id <> beneficiary_id)
      );

      CREATE TABLE IF NOT EXISTS app_meta (
        key TEXT PRIMARY KEY,
        value TEXT NOT NULL
      );
    `);
  }

  private seed() {
    const users = [
      ['alice', 'Alice', 'AL', '#FF7A64'],
      ['bob', 'Bob', 'BO', '#5E8BFF'],
      ['charlie', 'Charlie', 'CH', '#38A87A'],
      ['david', 'David', 'DA', '#9B72E8'],
    ];

    const insertUser = this.database.prepare(
      'INSERT OR IGNORE INTO users (id, name, initials, color) VALUES (?, ?, ?, ?)',
    );
    const seedUsers = this.database.transaction(() => {
      for (const user of users) insertUser.run(...user);
    });
    seedUsers();

    const exampleExpensesSeeded = this.database
      .prepare("SELECT value FROM app_meta WHERE key = 'example_expenses_seeded'")
      .get() as { value: string } | undefined;

    if (!exampleExpensesSeeded) {
      const expenseCount = this.database
        .prepare('SELECT COUNT(*) AS count FROM expenses')
        .get() as { count: number };
      const insertExpense = this.database.prepare(`
        INSERT INTO expenses (payer_id, beneficiary_id, amount_cents, description, created_at)
        VALUES (?, ?, ?, ?, ?)
      `);
      const seedExpensesOnce = this.database.transaction(() => {
        if (expenseCount.count === 0) {
          insertExpense.run('bob', 'alice', 12000, 'Weekend cabin', '2026-09-24T18:30:00.000Z');
          insertExpense.run('alice', 'charlie', 5000, 'Concert tickets', '2026-09-22T14:10:00.000Z');
          insertExpense.run('bob', 'david', 3000, 'Team lunch', '2026-09-20T11:45:00.000Z');
        }
        this.database.prepare(
          "INSERT INTO app_meta (key, value) VALUES ('example_expenses_seeded', '1')",
        ).run();
      });
      seedExpensesOnce();
    }
  }
}
