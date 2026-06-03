----
name: product-logic
description: Continue the Luxethread backend migration from Nestar property concepts to Luxethread product concepts while preserving current NestJS architecture and patterns.
----

# Luxethread backend migration

Use this skill when changing backend code for the Luxethread migration.

## Workflow

1. Search for effected property/product references before editing.
2. Preserve the resolver/service/module structure and patterns already used by `luxethread-api`.
3. Keep DTOs, enums, schemas in their existing folders.
4. Keep `MemberType.USER`, `MemberType.AGENT` and `MemberType.ADMIN` unchanged.
5. Use product terminology for catalog behavior and database lookups.
6. Update social modules consistency when product counters, likes, views, comments or notifications are involved.               
7. Update batch logic when product ranking or `memberProducts` effect rank calculation.
8. Update `docs/ai/COMPLETED_TASKS.md` after major completed work.