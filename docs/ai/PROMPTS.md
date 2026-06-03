# Useful Prompts for Future Codex Sessions

## Prompts Used in This Session

```text
Analyze this NestJS monorepo. Identify all modules, schemas, DTOs, GraphQL types, services, controllers, enums, and frontend references related to the current Nestar real-estate platform. Do not edit files yet. Produce a migration map to convert it into a clothes shop platform.
```

```text
safe rename Layer (no business logic change)
Rename all visible project/app identifiers from Nestar to Luxethread. Do not change domain logic. Keep APIs and database collections unchanged. Upadate package names, environment labels constant. Run lint and typecheck after refactoring. Please make plan first
```

```text
PLEASE IMPLEMENT THIS PLAN:
# Safe Luxethread Branding Rename
...
```

```text
Create a new folder: docs
Inside it, generate these markdown files:
BACKEND_MIGRATION.md
DECISIONS.md
FRONTEND_MIGRATION.md
COMPLETED_TASKS.md
NEXT_STEPS.md
PROMPTS.md
Use everything completed and discussed in this Codex session.
```

## Reusable Prompt: Verify Current State

```text
Inspect this NestJS monorepo and summarize the current migration state. Do not edit files. Report:
- current package/app names
- Nest project keys and physical folders
- all remaining Nestar/Luxethread/Petoria references
- real-estate domain modules still present
- validation blockers for lint/build
Use file paths and concise tables.
```

## Reusable Prompt: Petoria Branding Pass

```text
Implement a safe branding-only rename from the current visible brand to Petoria.
Do not change business logic, GraphQL operation names, DTO fields, MongoDB collections, database names, or physical app folders.
Update package metadata, Nest project keys, visible class/test labels, welcome strings, and docs if needed.
Run `npm run lint` and `npm run build`.
Report all changed files and validation results.
```

## Reusable Prompt: Backend Domain Plan

```text
Create a decision-complete backend plan to migrate the real-estate `Property` domain to the approved Petoria domain.
First inspect schemas, DTOs, resolvers, services, enums, config, batch jobs, and social modules.
Do not edit files.
Include:
- exact entity/field enum mapping
- GraphQL compatibility/deprecation strategy
- MongoDB collection and migration strategy
- batch job changes
- tests and rollout plan
```

## Reusable Prompt: Backend Domain Implementation

```text
Implement the approved Petoria backend domain migration plan.
Keep changes scoped to the approved files.
Preserve backward compatibility where the plan says to preserve it.
Do not rename physical folders unless explicitly approved.
Run lint, build, and relevant tests.
Report changed files, API changes, schema changes, and any validation failures.
```

## Reusable Prompt: Frontend Inventory

```text
Analyze the Next.js frontend for the Nestar to Petoria migration.
Do not edit files.
Find all routes, components, GraphQL queries/mutations, generated types, copy, navigation labels, filters, and upload targets that reference Nestar, Luxethread, properties, agents, or real-estate terminology.
Produce a route/component/API migration map with priorities.
```

## Reusable Prompt: Frontend Implementation

```text
Implement the approved Next.js frontend migration from Nestar real-estate terminology to Petoria terminology.
Keep GraphQL operation compatibility according to the backend plan.
Update visible UI copy, route labels, page titles, filters, forms, generated GraphQL usage, and tests.
Do not invent backend APIs that do not exist.
Run lint/build/tests and provide a concise validation report.
```

## Reusable Prompt: Validation Fixes

```text
Fix validation blockers in this NestJS monorepo without changing business logic.
Known blockers:
- `npm run lint` fails because `eslint.config.mjs` imports missing package `typescript-eslint`.
- `npm run build` may fail with EPERM while deleting `dist`.
Make the smallest safe changes, then run lint and build.
Report exact changes and remaining risks.
```
