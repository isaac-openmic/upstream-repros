# payload-19268

Reproduction for [payloadcms/payload#19268](https://github.com/payloadcms/payload/issues/19268): with `cacheComponents: true`, a join table with an async server `Cell` blanks the whole admin while it loads.

```sh
cd payload-19268
npm install
npm run build
npm start          # http://localhost:3000/admin, log in as dev@example.com / test
```

Open **Teams → Team**. The **Members** table shows "Loading…", then the whole admin goes blank for about 1.5 s (the timer in `src/components/SlowCell.tsx`), then the full table appears. The first start creates `repro.db` (SQLite) and seeds the user and team.

- `cacheComponents: false` in `next.config.ts`, then rebuild: no blank.
- `startTransition` around the state `RelationshipTable` sets after `getTableState`: no blank.

Tested on `payload` 3.92.1 (production build). 4.0.0-beta.6 doesn't show it: its root layout no longer wraps the admin in `Suspense`.
