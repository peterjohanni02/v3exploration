import React, { useMemo } from 'react';

/**
 * @param {{ transactions: import('../App.jsx').Transaction[] }} props
 */
export default function TransactionTable({ transactions }) {
  const columns = useMemo(
    () => [
      ['Transaction ID', 'TransactionID'],
      ['Customer Name', 'CustName'],
      ['Address', 'CustAddr'],
      ['Email', 'CustEmail'],
      ['PO #', 'PO'],
      ['AR Account', 'ARAccount'],
      ['Tax Exempt', 'TaxExempt'],
      ['Transaction Date', 'TransDate'],
      ['Notes', 'Notes'],
      ['Transport Cost', 'TransportCost'],
      ['Total Price', 'TotalPrice'],
    ],
    [],
  );

  return (
    <div className="table-wrapper">
      <table className="transactions-table">
        <thead>
          <tr>
            {columns.map(([label]) => (
              <th key={label} scope="col">
                {label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction) => (
            <tr key={transaction.TransactionID}>
              {columns.map(([label, key]) => {
                const value = transaction[key];
                switch (key) {
                  case 'TaxExempt':
                    return <td key={key}>{value ? 'Yes' : 'No'}</td>;
                  case 'TransDate': {
                    const date = value ? new Date(value) : null;
                    return (
                      <td key={key}>{date ? date.toLocaleDateString() : ''}</td>
                    );
                  }
                  case 'TransportCost':
                  case 'TotalPrice':
                    return (
                      <td key={key} className="numeric">
                        {typeof value === 'number'
                          ? value.toLocaleString(undefined, {
                              style: 'currency',
                              currency: 'USD',
                            })
                          : value ?? ''}
                      </td>
                    );
                  default:
                    return <td key={key}>{value ?? ''}</td>;
                }
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
