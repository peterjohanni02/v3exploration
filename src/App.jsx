import React, { useEffect, useMemo, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import TransactionTable from './components/TransactionTable.jsx';

const SUPABASE_URL = 'https://tslcgufxsbglncyxfxie.supabase.co';
const SUPABASE_ANON_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRzbGNndWZ4c2JnbG5jeXhmeGllIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjAwOTM0MjcsImV4cCI6MjA3NTY2OTQyN30.7an0OkjV-Uz--IyDiIWd8KxK04FcKjjBtGINh2piZk0';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

/**
 * @typedef {Object} Transaction
 * @property {number} TransactionID
 * @property {string} CustName
 * @property {string} CustAddr
 * @property {string} CustEmail
 * @property {string} PO
 * @property {string} ARAccount
 * @property {boolean} TaxExempt
 * @property {string} TransDate
 * @property {string} Notes
 * @property {number} TransportCost
 * @property {number} TotalPrice
 */

const TABLE_NAME_GUESSES = ['Transactions', 'transactions', 'Transaction'];

export default function App() {
  const [transactions, setTransactions] = useState(/** @type {Transaction[]} */ ([]));
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let cancelled = false;

    const loadTransactions = async () => {
      setLoading(true);
      setError('');

      for (const tableName of TABLE_NAME_GUESSES) {
        const { data, error: queryError } = await supabase
          .from(tableName)
          .select(
            'TransactionID, CustName, CustAddr, CustEmail, PO, ARAccount, TaxExempt, TransDate, Notes, TransportCost, TotalPrice',
          )
          .order('TransactionID', { ascending: true });

        if (queryError) {
          if (queryError.code === '42P01') {
            continue;
          }

          if (!cancelled) {
            setError(queryError.message ?? 'Unable to fetch transactions.');
            setLoading(false);
          }
          return;
        }

        if (!cancelled) {
          setTransactions(data ?? []);
          setLoading(false);
        }
        return;
      }

      if (!cancelled) {
        setError('Transactions table not found.');
        setLoading(false);
      }
    };

    loadTransactions();

    return () => {
      cancelled = true;
    };
  }, []);

  const status = useMemo(() => {
    if (loading) {
      return 'Loading transactions…';
    }
    if (error) {
      return error;
    }
    if (transactions.length === 0) {
      return 'No transactions available.';
    }
    return '';
  }, [loading, error, transactions]);

  return (
    <main className="app">
      <header className="app__header">
        <h1>Customer Transactions</h1>
        <p className="app__subtitle">Data sourced live from Supabase.</p>
      </header>

      {status ? <p className="app__status">{status}</p> : null}

      {!loading && !error && transactions.length > 0 ? (
        <TransactionTable transactions={transactions} />
      ) : null}
    </main>
  );
}
