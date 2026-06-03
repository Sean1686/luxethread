# Next Steps

## Priority Order for Tomorrow

1. Resolve the naming target: confirm whether final source branding should be Petoria or Luxethread.
2. Fix validation blockers so lint and build are reliable.
3. Define the Petoria domain model before changing schemas or GraphQL contracts.
4. Plan backend compatibility for old GraphQL names.
5. Start frontend inventory once the Next.js codebase is available.

## Backend Cleanup

| Priority | Task | Notes |
| --- | --- | --- |
| P0 | Decide final brand rename target | Current source says Luxethread; latest docs request says Petoria. |
| P0 | Fix ESLint dependency/config issue | Install/add `typescript-eslint` or update config to use installed packages. |
| P1 | Decide whether to rename Nest project keys from Luxethread to Petoria | Safe branding pass can be repeated without touching domain logic. |
| P1 | Correct `PropertyService.getVisited` to call `ViewService.getVisitedProperties` | This is a real behavior cleanup, so do separately from branding. |
| P1 | Correct `LikeSchema` enum import from `ViewGroup` to `LikeGroup` | Schema correctness cleanup. |
| P1 | Correct `ViewInput` GraphQL decorators for `viewRefId` and date fields | DTO correctness cleanup. |
| P2 | Decide whether `MemberType.AGENT` becomes seller/provider or remains temporarily | Required before domain migration. |
| P2 | Define Petoria schema and enum names | Required before renaming `Property`. |

## Frontend Migration

| Priority | Task | Notes |
| --- | --- | --- |
| P0 | Locate or attach the Next.js frontend repository | No frontend source exists in this workspace. |
| P0 | Inventory routes, components, GraphQL operations, generated types, and copy | Build the exact frontend migration map. |
| P1 | Replace visible Nestar/Luxethread labels with Petoria after brand decision | Keep API calls unchanged until backend aliases exist. |
| P1 | Map property list/detail/create/admin pages to Petoria pages | Use `FRONTEND_MIGRATION.md` as the starting map. |
| P2 | Regenerate GraphQL types after backend schema changes | Prevent stale frontend types. |

## Testing

| Priority | Task | Notes |
| --- | --- | --- |
| P0 | Make `npm run lint` runnable | Current blocker is missing `typescript-eslint`. |
| P0 | Run `npm run build` without requiring elevated permissions | Investigate locked or permission-protected `dist` files. |
| P1 | Add smoke tests for branding-safe boot paths | API and batch app start checks. |
| P1 | Add GraphQL smoke tests for property list/detail/favorites/visited | Baseline before domain migration. |
| P2 | Add migration compatibility tests once aliases are introduced | Ensures old and new GraphQL names both work during transition. |

## Documentation

| Priority | Task | Notes |
| --- | --- | --- |
| P0 | Confirm Petoria glossary | Needed before schema and UI language changes. |
| P1 | Update docs if final brand remains Luxethread instead of Petoria | Current docs intentionally record the naming conflict. |
| P1 | Add a backend API compatibility document | Include deprecation plan and frontend rollout sequencing. |
| P2 | Add data migration document | Include collection strategy, indexes, and rollback plan. |
