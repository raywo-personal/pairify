# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

Pairify is a client-only Angular app that randomly splits a list of
persons into evenly sized teams, optionally assigning one "driver" per team
(driver-navigator pairing). There is no backend; all state lives in
`localStorage`. Deployed as static assets on a Cloudflare Worker at
https://pairify.skillbird.de/.

## Commands

Use `pnpm`, never `npm`/`npx`.

```shell
pnpm install
pnpm start                 # dev server on http://localhost:4200
pnpm build                 # production build into dist/pairify
pnpm test                  # Vitest in jsdom (watch mode)
pnpm test --watch=false    # single run
pnpm test --include src/app/grouping/services/grouping.service.spec.ts
pnpm lint                  # angular-eslint over src/**/*.ts and *.html
```

Stub browser APIs that jsdom lacks in `src/test-setup.ts`, not in
individual specs.

Deployment runs only through the GitHub Actions workflow
`deploy-to-cloudflare-workers.yml` on every push to `main`; do not deploy
by hand. `wrangler.jsonc` configures the Worker and its custom domain.
Keep `not_found_handling: "single-page-application"` – the router uses
path URLs, and deep links like `/persons` 404 without it.

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

## Angular MCP server

`.mcp.json` registers the Angular CLI MCP server (`pnpm exec ng mcp`).

- Look up Angular APIs with `search_documentation` instead of relying on
  memory.
- Keep the server on the project's local CLI. Do not switch it to
  `pnpm dlx @angular/cli@latest` – docs and best practices would then
  describe a different Angular version than the one installed.
- The architecture described in this file overrides `get_best_practices`.
  State stays in `BehaviorSubject`s with the event bus; do not migrate it
  to signals unless asked.

## Plugin Bindings

| Step | Binding |
|------|---------|
| `implement-issue/dependents` | Persisted data: `localStorage` keys in `PersistenceService` and the JSON import format in `import/models/export-import.model.ts`. A change to `Person`, `Team` or these keys must keep previously stored data and exported files readable. |
| `review-changes/checks` | Same persisted-data rule as `implement-issue/dependents`; new user-facing strings are marked with `$localize` or `i18n`. |
| `pr-review/checks` | Same as `review-changes/checks`. |
| `implement-issue/user-docs` | `README.md`, section "Usage", English, for end users. |
| `review-changes/user-docs` | Same as `implement-issue/user-docs`. |
| `pr-review/user-docs` | Same as `implement-issue/user-docs`. |
