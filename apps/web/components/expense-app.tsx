'use client';

import { ArrowRight, Check, ReceiptText, RotateCw, Scale, Trash2, X } from 'lucide-react';
import { FormEvent, KeyboardEvent as ReactKeyboardEvent, useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { api } from '@/lib/api';
import { getMessages } from '@/lib/i18n';
import type { Balance, Expense, Locale, User } from '@/lib/types';
import { Avatar } from './avatar';
import { SettlementLoop } from './settlement-loop';
import { AnimatedList } from './ui/animated-list';
import { InteractiveHoverButton } from './ui/interactive-hover-button';
import { LineShadowText } from './ui/line-shadow-text';

type View = 'expenses' | 'balances';

export function ExpenseApp() {
  const [locale, setLocale] = useState<Locale>('fa');
  const [view, setView] = useState<View>('expenses');
  const [users, setUsers] = useState<User[]>([]);
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [balances, setBalances] = useState<Balance[]>([]);
  const [loading, setLoading] = useState(true);
  const [initializing, setInitializing] = useState(true);
  const [error, setError] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [clearDialogOpen, setClearDialogOpen] = useState(false);
  const [clearing, setClearing] = useState(false);
  const [actionError, setActionError] = useState('');
  const [actionMessage, setActionMessage] = useState('');
  const addExpenseButtonRef = useRef<HTMLButtonElement>(null);
  const clearExpensesButtonRef = useRef<HTMLButtonElement>(null);
  const t = getMessages(locale);

  const loadData = useCallback(async (initial = false) => {
    setLoading(true);
    setError(false);
    try {
      const [nextUsers, nextExpenses, nextBalances] = await Promise.all([
        api.users(),
        api.expenses(),
        api.balances(),
      ]);
      setUsers(nextUsers);
      setExpenses(nextExpenses);
      setBalances(nextBalances);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
      if (initial) setInitializing(false);
    }
  }, []);

  useEffect(() => {
    const saved = localStorage.getItem('settle-locale');
    setLocale(saved === 'en' ? 'en' : 'fa');
    const onLocale = (event: Event) => setLocale((event as CustomEvent<Locale>).detail);
    window.addEventListener('settle-locale', onLocale);
    void loadData(true);
    return () => window.removeEventListener('settle-locale', onLocale);
  }, [loadData]);

  async function handleCreated() {
    setModalOpen(false);
    setActionMessage('');
    await loadData();
    setView('expenses');
    requestAnimationFrame(() => addExpenseButtonRef.current?.focus());
  }

  function closeModal() {
    setModalOpen(false);
    requestAnimationFrame(() => addExpenseButtonRef.current?.focus());
  }

  const closeClearDialog = useCallback(() => {
    setClearDialogOpen(false);
    setActionError('');
    requestAnimationFrame(() => clearExpensesButtonRef.current?.focus());
  }, []);

  function handleTabKeyDown(event: ReactKeyboardEvent<HTMLButtonElement>) {
    if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
    event.preventDefault();
    const nextView: View = event.key === 'ArrowRight' ? 'balances' : 'expenses';
    setView(nextView);
    requestAnimationFrame(() => document.getElementById(`ledger-tab-${nextView}`)?.focus());
  }

  async function clearExpenses() {
    setClearing(true);
    setActionError('');
    setActionMessage('');
    try {
      await api.clearExpenses();
      await loadData();
      setActionMessage(t.clearSuccess);
      closeClearDialog();
    } catch {
      setActionError(t.clearError);
    } finally {
      setClearing(false);
    }
  }

  return (
    <>
      {initializing && <PageLoader label={t.loading} />}
      <main className="mx-auto min-h-[calc(100vh-4rem)] max-w-6xl overflow-hidden px-5 pb-10 pt-10 sm:px-8 sm:pb-14 sm:pt-16">
      <section className="grid items-center gap-8 border-b border-line pb-10 sm:pb-12 lg:grid-cols-[minmax(0,1fr)_19rem] lg:gap-12">
        <div className="max-w-2xl">
          <h1 className="text-balance text-[clamp(2.25rem,6vw,4.75rem)] font-semibold leading-[1.02] tracking-[-0.04em]">
            <span className="block">{t.titleStart}</span>
            <LineShadowText>{t.titleAccent}</LineShadowText>
          </h1>
          <p className="mt-5 max-w-xl text-base leading-7 text-muted sm:text-lg sm:leading-8">
            {t.subtitle}
          </p>
          <InteractiveHoverButton
            ref={addExpenseButtonRef}
            type="button"
            onClick={() => setModalOpen(true)}
            className="mt-7"
          >
            {t.addExpense}
          </InteractiveHoverButton>
        </div>
        <div className="mx-auto lg:me-0"><SettlementLoop locale={locale} /></div>
      </section>

      <section className="pt-9 sm:pt-12">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-2xl font-semibold tracking-[-0.025em]">
            {view === 'expenses' ? t.ledgerTitle : t.balanceTitle}
          </h2>
          <div className="flex flex-wrap items-center gap-2 self-start">
            <button
              ref={clearExpensesButtonRef}
              type="button"
              onClick={() => {
                setActionError('');
                setClearDialogOpen(true);
              }}
              disabled={loading || clearing || expenses.length === 0}
              className="inline-flex h-10 items-center gap-2 rounded-full px-3 text-sm font-medium text-red-700 transition-colors hover:bg-red-500/10 disabled:cursor-not-allowed disabled:opacity-40 dark:text-red-300"
            >
              <Trash2 className="h-4 w-4" aria-hidden="true" />
              {clearing ? t.clearingExpenses : t.clearExpenses}
            </button>
            <div className="inline-flex rounded-full bg-ink/[0.055] p-1 dark:bg-white/[0.07]" role="tablist" aria-label={t.ledgerViewLabel}>
            <button
              id="ledger-tab-expenses"
              type="button"
              role="tab"
              aria-selected={view === 'expenses'}
              aria-controls="ledger-panel"
              tabIndex={view === 'expenses' ? 0 : -1}
              onClick={() => setView('expenses')}
              onKeyDown={handleTabKeyDown}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${view === 'expenses' ? 'bg-surface text-ink shadow-sm' : 'text-muted hover:text-ink'}`}
            >
              {t.expenses}
              {!loading && <span className="ms-2 tabular-nums text-muted">{expenses.length}</span>}
            </button>
            <button
              id="ledger-tab-balances"
              type="button"
              role="tab"
              aria-selected={view === 'balances'}
              aria-controls="ledger-panel"
              tabIndex={view === 'balances' ? 0 : -1}
              onClick={() => setView('balances')}
              onKeyDown={handleTabKeyDown}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${view === 'balances' ? 'bg-surface text-ink shadow-sm' : 'text-muted hover:text-ink'}`}
            >
              {t.balances}
              {!loading && <span className="ms-2 tabular-nums text-muted">{balances.length}</span>}
            </button>
            </div>
          </div>
        </div>

        {actionError && <p role="alert" className="mt-4 text-sm text-red-700 dark:text-red-300">{actionError}</p>}
        {actionMessage && <p role="status" className="sr-only">{actionMessage}</p>}

        <div id="ledger-panel" className="mt-6 min-h-80" role="tabpanel" aria-labelledby={`ledger-tab-${view}`}>
          {loading && <LoadingState label={t.loading} />}
          {!loading && error && <ErrorState label={t.loadError} retry={t.retry} onRetry={loadData} />}
          {!loading && !error && view === 'expenses' && (
            <ExpenseList expenses={expenses} locale={locale} emptyTitle={t.emptyExpenses} emptyDetail={t.emptyExpensesDetail} paidLabel={t.paid} />
          )}
          {!loading && !error && view === 'balances' && (
            <BalanceList balances={balances} locale={locale} emptyTitle={t.settled} emptyDetail={t.settledDetail} owesLabel={t.owes} />
          )}
        </div>
      </section>

      <ScenarioSection locale={locale} />

      <footer className="mt-14 flex flex-col gap-2 border-t border-line pt-6 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
        <span>{t.byline}</span>
        <span>Next.js · NestJS · SQLite</span>
      </footer>

      {modalOpen && (
        <ExpenseModal
          users={users}
          locale={locale}
          onClose={closeModal}
          onCreated={handleCreated}
        />
      )}
      {clearDialogOpen && (
        <ClearExpensesDialog
          locale={locale}
          clearing={clearing}
          error={actionError}
          onClose={closeClearDialog}
          onConfirm={clearExpenses}
        />
      )}
      </main>
    </>
  );
}

function ClearExpensesDialog({ locale, clearing, error, onClose, onConfirm }: {
  locale: Locale;
  clearing: boolean;
  error: string;
  onClose: () => void;
  onConfirm: () => Promise<void>;
}) {
  const t = getMessages(locale);
  const dialogRef = useRef<HTMLDivElement>(null);
  const confirmRef = useRef<HTMLButtonElement>(null);
  const clearingRef = useRef(clearing);

  useEffect(() => {
    clearingRef.current = clearing;
  }, [clearing]);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    const background = Array.from(document.querySelectorAll<HTMLElement>('header, main'));
    document.body.style.overflow = 'hidden';
    background.forEach((element) => {
      element.inert = true;
      element.setAttribute('aria-hidden', 'true');
    });
    confirmRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && !clearingRef.current) onClose();
      if (event.key !== 'Tab') return;
      const focusable = dialogRef.current?.querySelectorAll<HTMLElement>('button:not([disabled])');
      if (!focusable?.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      background.forEach((element) => {
        element.inert = false;
        element.removeAttribute('aria-hidden');
      });
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [onClose]);

  return createPortal(
    <div className="fixed inset-0 z-50 grid place-items-end bg-black/45 backdrop-blur-[2px] sm:place-items-center sm:p-6" onMouseDown={(event) => event.target === event.currentTarget && !clearing && onClose()}>
      <div ref={dialogRef} role="alertdialog" aria-modal="true" aria-labelledby="clear-expenses-title" aria-describedby="clear-expenses-detail" className="animate-modal-in w-full bg-surface px-5 pb-6 pt-5 shadow-modal sm:max-w-md sm:rounded-2xl sm:p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 id="clear-expenses-title" className="text-xl font-semibold tracking-[-0.02em]">{t.clearDialogTitle}</h2>
            <p id="clear-expenses-detail" className="mt-2 text-sm leading-6 text-muted">{t.clearDialogDetail}</p>
          </div>
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-red-500/10 text-red-700 dark:text-red-300" aria-hidden="true">
            <Trash2 className="h-5 w-5" />
          </span>
        </div>
        {error && <p role="alert" className="mt-4 rounded-xl bg-red-500/10 px-4 py-3 text-sm text-red-700 dark:text-red-300">{error}</p>}
        <div className="mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
          <button type="button" onClick={onClose} disabled={clearing} className="h-11 rounded-full px-5 text-sm font-medium text-muted transition-colors hover:bg-ink/[0.055] hover:text-ink disabled:opacity-40 dark:hover:bg-white/[0.08]">{t.cancel}</button>
          <button ref={confirmRef} type="button" onClick={() => void onConfirm()} disabled={clearing} className="h-11 rounded-full bg-red-600 px-5 text-sm font-medium text-white transition-colors hover:bg-red-700 disabled:cursor-wait disabled:opacity-60">{clearing ? t.clearingExpenses : t.clearConfirmAction}</button>
        </div>
      </div>
    </div>,
    document.body,
  );
}

function ExpenseList({ expenses, locale, emptyTitle, emptyDetail, paidLabel }: {
  expenses: Expense[];
  locale: Locale;
  emptyTitle: string;
  emptyDetail: string;
  paidLabel: string;
}) {
  if (expenses.length === 0) return <EmptyState icon="receipt" title={emptyTitle} detail={emptyDetail} />;

  return (
    <AnimatedList as="ul" className="divide-y divide-line border-y border-line">
      {expenses.map((expense) => (
        <li key={expense.id} className="grid gap-4 py-5 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center sm:py-6">
          <div className="flex min-w-0 items-center gap-3.5 sm:gap-4">
            <Avatar user={expense.payer} />
            <div className="min-w-0">
              <p className="truncate font-medium text-ink">{expense.description}</p>
              <div className="mt-1 flex flex-wrap items-center gap-x-1.5 text-sm text-muted">
                <span>{expense.payer.name}</span>
                <span>{paidLabel}</span>
                <span>{expense.beneficiary.name}</span>
                <span aria-hidden="true">·</span>
                <time dateTime={expense.createdAt}>{formatDate(expense.createdAt, locale)}</time>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between ps-[3.4rem] sm:block sm:ps-0 sm:text-end">
            <span className="text-xs text-muted sm:hidden">{expense.payer.name} → {expense.beneficiary.name}</span>
            <span className="text-lg font-semibold tabular-nums tracking-[-0.015em]">{formatAmount(expense.amount, locale)}</span>
          </div>
        </li>
      ))}
    </AnimatedList>
  );
}

function BalanceList({ balances, locale, emptyTitle, emptyDetail, owesLabel }: {
  balances: Balance[];
  locale: Locale;
  emptyTitle: string;
  emptyDetail: string;
  owesLabel: string;
}) {
  if (balances.length === 0) return <EmptyState icon="scale" title={emptyTitle} detail={emptyDetail} />;

  return (
    <AnimatedList as="ul" className="divide-y divide-line border-y border-line">
      {balances.map((balance) => (
        <li key={`${balance.debtor.id}-${balance.creditor.id}`} className="flex items-center gap-3 py-5 sm:gap-5 sm:py-6">
          <div className="flex -space-x-2 rtl:space-x-reverse">
            <Avatar user={balance.debtor} />
            <span className="rounded-full ring-4 ring-canvas"><Avatar user={balance.creditor} /></span>
          </div>
          <p className="min-w-0 flex-1 text-sm sm:text-base">
            <strong className="font-semibold">{balance.debtor.name}</strong>
            <span className="mx-1.5 text-muted">{owesLabel}</span>
            <strong className="font-semibold">{balance.creditor.name}</strong>
          </p>
          <span className="text-lg font-semibold tabular-nums tracking-[-0.015em] sm:text-xl">{formatAmount(balance.amount, locale)}</span>
        </li>
      ))}
    </AnimatedList>
  );
}

function ScenarioSection({ locale }: { locale: Locale }) {
  const t = getMessages(locale);
  const scenarios = [
    { title: t.twoWay, input: t.twoWayInput, result: t.twoWayResult },
    { title: t.loop, input: t.loopInput, result: t.loopResult },
  ];

  return (
    <section className="mt-14 border-t border-line pt-10 sm:mt-20 sm:pt-12">
      <h2 className="text-2xl font-semibold tracking-[-0.025em]">{t.examplesTitle}</h2>
      <p className="mt-2 max-w-xl text-sm leading-6 text-muted sm:text-base">{t.examplesIntro}</p>
      <div className="mt-7 divide-y divide-line border-y border-line">
        {scenarios.map((scenario) => (
          <div key={scenario.title} className="grid gap-3 py-5 sm:grid-cols-[10rem_minmax(0,1fr)_auto] sm:items-center sm:gap-6">
            <strong className="font-semibold">{scenario.title}</strong>
            <span className="text-sm leading-6 text-muted" dir={locale === 'fa' ? 'rtl' : 'ltr'}>{scenario.input}</span>
            <span className="inline-flex items-center gap-2 text-sm font-semibold text-ink">
              <Check className="h-4 w-4 text-accent" />
              {scenario.result}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}

function PageLoader({ label }: { label: string }) {
  useEffect(() => {
    const background = Array.from(document.querySelectorAll<HTMLElement>('header, main'));
    background.forEach((element) => {
      element.inert = true;
      element.setAttribute('aria-hidden', 'true');
    });
    return () => background.forEach((element) => {
      element.inert = false;
      element.removeAttribute('aria-hidden');
    });
  }, []);

  return (
    <div data-page-loader-root="true" className="fixed inset-0 z-[100] grid place-items-center bg-canvas px-6" role="status" aria-live="polite" aria-busy="true">
      <div className="text-center">
        <div className="loader-mark mx-auto flex justify-center"><SettlementLoop compact /></div>
        <p className="mt-1 text-sm font-medium text-muted">{label}</p>
      </div>
    </div>
  );
}

function ExpenseModal({ users, locale, onClose, onCreated }: {
  users: User[];
  locale: Locale;
  onClose: () => void;
  onCreated: () => void;
}) {
  const t = getMessages(locale);
  const [payerId, setPayerId] = useState(users[0]?.id ?? '');
  const [beneficiaryId, setBeneficiaryId] = useState(users[1]?.id ?? '');
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [formError, setFormError] = useState('');
  const [saving, setSaving] = useState(false);
  const amountRef = useRef<HTMLInputElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const savingRef = useRef(false);

  useEffect(() => {
    savingRef.current = saving;
  }, [saving]);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    const background = Array.from(document.body.children).filter((element) => element.tagName !== 'DIV' || element.getAttribute('data-modal-root') !== 'true') as HTMLElement[];
    document.body.style.overflow = 'hidden';
    background.forEach((element) => {
      element.inert = true;
      element.setAttribute('aria-hidden', 'true');
    });
    amountRef.current?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && !savingRef.current) onClose();
      if (event.key !== 'Tab') return;
      const focusable = dialogRef.current?.querySelectorAll<HTMLElement>(
        'button:not([disabled]), input:not([disabled]), select:not([disabled]), [href], [tabindex]:not([tabindex="-1"])',
      );
      if (!focusable?.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      background.forEach((element) => {
        element.inert = false;
        element.removeAttribute('aria-hidden');
      });
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [onClose]);

  async function submit(event: FormEvent) {
    event.preventDefault();
    const numericAmount = Number(amount);
    if (!payerId || !beneficiaryId || payerId === beneficiaryId || numericAmount <= 0 || !description.trim()) {
      setFormError(t.formError);
      return;
    }

    setSaving(true);
    setFormError('');
    try {
      await api.createExpense({ payerId, beneficiaryId, amount: numericAmount, description: description.trim() });
      await onCreated();
    } catch {
      setFormError(t.saveError);
      setSaving(false);
    }
  }

  function changePayer(nextPayerId: string) {
    setPayerId(nextPayerId);
    if (nextPayerId === beneficiaryId) {
      setBeneficiaryId(users.find((user) => user.id !== nextPayerId)?.id ?? '');
    }
  }

  function changeBeneficiary(nextBeneficiaryId: string) {
    setBeneficiaryId(nextBeneficiaryId);
    if (nextBeneficiaryId === payerId) {
      setPayerId(users.find((user) => user.id !== nextBeneficiaryId)?.id ?? '');
    }
  }

  return createPortal(
    <div data-modal-root="true" className="fixed inset-0 z-50 grid items-end bg-black/45 p-0 backdrop-blur-[2px] sm:place-items-center sm:p-6" onMouseDown={(event) => event.target === event.currentTarget && !saving && onClose()}>
      <div ref={dialogRef} role="dialog" aria-modal="true" aria-labelledby="expense-modal-title" className="animate-modal-in w-full max-w-full rounded-t-2xl bg-surface shadow-modal sm:max-w-lg sm:rounded-2xl">
        <div className="flex items-center justify-between border-b border-line px-5 py-4 sm:px-6">
          <h2 id="expense-modal-title" className="text-xl font-semibold tracking-[-0.02em]">{t.addExpense}</h2>
          <button type="button" onClick={onClose} disabled={saving} aria-label={t.close} className="grid h-9 w-9 place-items-center rounded-full bg-ink/[0.055] text-muted transition-colors hover:text-ink disabled:opacity-40 dark:bg-white/[0.08]">
            <X className="h-4.5 w-4.5" />
          </button>
        </div>

        <form onSubmit={submit} className="space-y-5 px-5 py-6 sm:px-6">
          <div className="grid grid-cols-[1fr_auto_1fr] items-end gap-2 sm:gap-3">
            <SelectField label={t.paidBy} value={payerId} onChange={changePayer} users={users} excludedId={beneficiaryId} />
            <ArrowRight className={`mb-3 h-5 w-5 text-muted ${locale === 'fa' ? 'rotate-180' : ''}`} aria-hidden="true" />
            <SelectField label={t.expenseFor} value={beneficiaryId} onChange={changeBeneficiary} users={users} excludedId={payerId} />
          </div>
          <p className="-mt-2 text-xs leading-5 text-muted">{t.directionHelp}</p>

          <label className="block">
            <span className="mb-2 block text-sm font-medium">{t.amount}</span>
            <div className="relative">
              <span className="absolute inset-y-0 start-0 flex items-center ps-4 text-muted">$</span>
              <input ref={amountRef} value={amount} onChange={(event) => setAmount(event.target.value)} inputMode="decimal" type="number" min="0.01" max="1000000" step="0.01" required className="h-12 w-full rounded-xl bg-canvas ps-8 pe-4 text-lg tabular-nums outline-none ring-1 ring-inset ring-line transition focus:ring-2 focus:ring-accent" />
            </div>
          </label>

          <label className="block">
            <span className="mb-2 block text-sm font-medium">{t.description}</span>
            <input value={description} onChange={(event) => setDescription(event.target.value)} maxLength={120} required placeholder={t.descriptionPlaceholder} className="h-12 w-full rounded-xl bg-canvas px-4 outline-none ring-1 ring-inset ring-line transition focus:ring-2 focus:ring-accent" />
          </label>

          {formError && <p role="alert" className="rounded-xl bg-red-500/10 px-4 py-3 text-sm text-red-700 dark:text-red-300">{formError}</p>}

          <div className="flex flex-col-reverse gap-2 pt-1 sm:flex-row sm:justify-end">
            <button type="button" onClick={onClose} disabled={saving} className="h-11 rounded-full px-5 text-sm font-medium text-muted transition-colors hover:bg-ink/[0.055] hover:text-ink disabled:opacity-40 dark:hover:bg-white/[0.08]">{t.cancel}</button>
            <button type="submit" disabled={saving} className="h-11 rounded-full bg-accent px-5 text-sm font-medium text-white transition-colors hover:bg-accent/90 disabled:cursor-wait disabled:opacity-60">{saving ? t.saving : t.saveExpense}</button>
          </div>
        </form>
      </div>
    </div>,
    document.body,
  );
}

function SelectField({ label, value, onChange, users, excludedId }: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  users: User[];
  excludedId: string;
}) {
  return (
    <label className="min-w-0">
      <span className="mb-2 block text-sm font-medium">{label}</span>
      <select value={value} onChange={(event) => onChange(event.target.value)} className="h-12 w-full rounded-xl bg-canvas px-3 text-base outline-none ring-1 ring-inset ring-line transition focus:ring-2 focus:ring-accent sm:px-4">
        {users.map((user) => <option key={user.id} value={user.id} disabled={user.id === excludedId}>{user.name}</option>)}
      </select>
    </label>
  );
}

function LoadingState({ label }: { label: string }) {
  return <div className="grid min-h-72 place-items-center text-sm text-muted"><span className="animate-pulse">{label}</span></div>;
}

function ErrorState({ label, retry, onRetry }: { label: string; retry: string; onRetry: () => void }) {
  return (
    <div className="grid min-h-72 place-items-center text-center">
      <div>
        <p className="text-muted">{label}</p>
        <button type="button" onClick={onRetry} className="mx-auto mt-4 inline-flex items-center gap-2 rounded-full bg-ink px-4 py-2 text-sm font-medium text-surface">
          <RotateCw className="h-4 w-4" />{retry}
        </button>
      </div>
    </div>
  );
}

function EmptyState({ icon, title, detail }: { icon: 'receipt' | 'scale'; title: string; detail: string }) {
  return (
    <div className="grid min-h-72 place-items-center text-center">
      <div className="max-w-sm">
        <span className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-ink/[0.055] text-muted dark:bg-white/[0.08]">
          {icon === 'receipt' ? <ReceiptText className="h-5 w-5" /> : <Scale className="h-5 w-5" />}
        </span>
        <h3 className="mt-4 font-semibold">{title}</h3>
        <p className="mt-2 text-sm leading-6 text-muted">{detail}</p>
      </div>
    </div>
  );
}

function formatAmount(amount: number, locale: Locale) {
  return new Intl.NumberFormat(locale === 'fa' ? 'fa-IR' : 'en-US', {
    style: 'currency', currency: 'USD', minimumFractionDigits: amount % 1 === 0 ? 0 : 2,
  }).format(amount);
}

function formatDate(value: string, locale: Locale) {
  return new Intl.DateTimeFormat(locale === 'fa' ? 'fa-IR' : 'en-US', {
    month: 'short', day: 'numeric', year: 'numeric',
  }).format(new Date(value));
}
