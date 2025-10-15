# Transactions Viewer

A lightweight React web app that loads transactions from Supabase and renders them in a responsive table. The project avoids build tooling by loading dependencies straight from the [esm.sh](https://esm.sh) CDN, making it easy to preview the UI with any static file server.

## Getting started

1. Serve the project directory with any static file server. A few options:
   - Python: `python -m http.server 5173`
   - Node.js (npx): `npx serve .`
   - Deno: `deno task serve`
2. Open the reported URL (for the Python example: [http://localhost:5173](http://localhost:5173)).
3. The app will request transaction data directly from Supabase using the supplied anonymous key and display the results in the table.

## Project structure

```
index.html          # Entry HTML file with import maps for React and Supabase
src/
  App.jsx          # Root React component that fetches and stores transactions
  main.jsx         # ReactDOM entry point
  styles.css       # Global styles
  components/
    TransactionTable.jsx  # Presentational table component
```

## Customisation

- Update the Supabase project URL or key in `src/App.jsx` if you fork the backend.
- Adjust the column rendering logic in `src/components/TransactionTable.jsx` to change formatting or add derived values.
- Modify `src/styles.css` for alternative themes or layouts.

## Notes

- The client attempts a few common table-name variations (`Transactions`, `transactions`, `Transaction`). If your Supabase table uses a different name, update `TABLE_NAME_GUESSES` in `src/App.jsx`.
- Because the anonymous key is embedded client-side, be sure the Supabase policies restrict data access appropriately before deploying publicly.
