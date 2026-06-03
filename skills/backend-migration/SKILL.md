----
name: backend-migration
description: Continue the Luxethread backend migration from Nestar property concepts to Luxethread product concepts while preserving current NestJS architecture and patterns. Cover backend code, tests, docs, configs, and migration metadata, and validate all changes with NestJS tests and lint/type checks before considering the migration complete.
----

# Luxethread backend migration

Use this skill when changing backend code for the Luxethread migration. After making changes, run the relevant NestJS tests and lint/type checks, and do not consider the migration complete if any validation step fails.

## Workflow

Always do:
1. Search all code, tests, comments, and docs for legacy property terminology and current product terminology before editing.
2. Preserve the resolver/service/module structure and patterns already used by `luxethread-api`.
3. Keep DTOs, enums, and schemas in their existing folders.
4. Keep `MemberType.USER`, `MemberType.AGENT`, and `MemberType.ADMIN` unchanged.
5. If no property/product references are found, stop after confirming the search and report that no migration changes are required.
6. If a legacy property or product reference is ambiguous or cannot be mapped to a product term without guesswork, stop and ask for clarification before editing any code.
7. If two rules conflict, preserve existing architecture and naming patterns first, then apply product terminology changes.

Only when this applies:
8. Use product terminology for catalog behavior and database lookups.
9. Update every social module that references product counters, likes, views, comments, or notifications so the naming, DTOs, services, and resolvers use the same product terminology and related logic.
10. Update batch logic whenever product ranking logic is used or when `memberProducts` changes rank calculation, and list the exact batch paths that must be updated.
11. Update `docs/ai/COMPLETED_TASKS.md` after major completed work.