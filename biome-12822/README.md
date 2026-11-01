# biome-12822

Reproduction for [biomejs/biome#12822](https://github.com/biomejs/biome/issues/12822): `biome ci` panics with `path is expected to be under the root`.

```sh
cd biome-12822/packages/a
npm install
npx biome ci                     # 2.6.4: panics while processing packages/b/src/x.css
npx @biomejs/biome@2.5.15 ci     # checks cleanly
```

`npm install` links `b` into `packages/a/node_modules/b`, as a pnpm workspace does. The crash needs all of these:

- `vcs.root` points at this folder (`"../.."`), with `useIgnoreFile: true`
- `files.includes` excludes `*.scss`
- a rule that scans the project is on (`noFloatingPromises`)
- `src/layout.ts` imports the excluded `src/a.scss`, which `@import`s `b/src/x.css` through `node_modules`
