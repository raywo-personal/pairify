# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

Pairify is a client-only Angular 19 app that randomly splits a list of
persons into evenly sized teams, optionally assigning one "driver" per team
(driver-navigator pairing). There is no backend; all state lives in
`localStorage`. Deployed to GitHub Pages at
https://raywo-personal.github.io/pairify/.

## Commands

Use `pnpm`, never `npm`/`npx`.

```shell
pnpm install
pnpm start                 # dev server on http://localhost:4200
pnpm build                 # production build into dist/pairify
pnpm test                  # Karma + Jasmine in Chrome (watch mode)
pnpm test --watch=false    # single run
pnpm test --include src/app/grouping/services/grouping.service.spec.ts
pnpm lint                  # angular-eslint over src/**/*.ts and *.html
pnpm ng deploy             # build with gh-pages config and publish to GitHub Pages
```

The `gh-pages` build configuration sets the absolute `baseHref` for the
Pages subpath; asset paths in `public/` (e.g. `site.webmanifest`) must be
relative so they resolve under `/pairify/`.

## Architecture

Standalone components only (no NgModules), `inject()` instead of constructor
injection, all services `providedIn: 'root'`. Feature folders under
`src/app/` (`persons`, `grouping`, `import`, `start`, `navigation`) each hold
`components/`, `services/`, `models/`; cross-cutting code is in `shared/`.

### State and the event bus

- `PersonService` and `GroupingService` own the state as `BehaviorSubject`s
  and expose `persons$` / `teams$` observables. Components consume them via
  `AsyncPipe`. `PersonService` additionally uses signals (`nameSortOrder`,
  `nameFilter`) with an `effect` to derive `filteredPersons$`.
- Every mutation emits a `BusEvent` on `EventBusService`
  (`shared/event-bus/`). Event types and the allowed payload union live in
  `event.model.ts`; extend both when adding an event.
- `DomainLogicService` is the central subscriber. It is instantiated eagerly
  via `provideAppInitializer` in `app.config.ts` – without that it would never
  subscribe. For each event it
  1. dispatches to registered `EventHandler`s (`shared/event-handler/`), used
     for cross-feature reactions such as `PERSONS_RESET` → reset teams, and
  2. calls `PersistenceService.saveAllData()` for events listed in
     `eventsWithPersistence`.
- New cross-feature side effects go into a new `EventHandler` registered in
  `DomainLogicService.handler`, not into direct service-to-service calls.
- `PersistenceService.readAllData()` restores state in
  `AppComponent.ngOnInit`. Restoring uses `addPerson(person, true)` /
  `loadTeams()` so it does not emit events and trigger a save loop.

### Team creation

`GroupingService.createTeams()` shuffles persons and distributes the
remainder across the first teams. Setting `teamsCount` or `useDriver`
immediately regenerates teams.

### Import

Files are dropped anywhere on the app (`AppComponent` emits
`DRAG_OVER`/`DRAG_LEAVE`) or picked in the import UI. `UploadService` reads
`.txt` (one name per line) or `.json` (`{ "type": "persons", "data":
Person[] }`, validated via `validateObject` + `ObjectValidator` in
`shared/helper/validate-object.ts`). Results and errors are reported as bus
events (`TXT_FILE_UPLOADED`, `JSON_FILE_UPLOADED`, `DROP_ERROR` with an
`ImportError` string). `ImportService.importPersons()` replaces all existing
persons.

### UI and i18n

- Bootstrap 5 with ng-bootstrap and bootstrap-icons; global styles are split
  into partials in `src/app/styles/` and pulled in by `src/styles.scss`.
- User-facing strings are marked for `@angular/localize` (`$localize` with
  `@@p.*` IDs, `i18n` attributes in templates). Keep marking new strings this
  way. No translation files exist; the source language is English.
- Route `data` carries `title` and `icon` (bootstrap-icons name), which the
  navigation renders.

## Conventions

- Component and directive selectors use the `app` prefix (enforced by lint).
- Use double quotes in TypeScript (`.editorconfig`), including imports and
  decorators.
