# Luxethread backend agent instructions

Luxethread is a NestJS GraphQL monorepo migrated from real estate platform into ecommerce clothing platform

## Read first

Before changing code, read the current AI handoff docs:

- `docs/ai/BACKEND_MIGRATION.md`
- `docs/ai/DECISIONS.md`
- `docs/ai/COMPLETED_TASK.md`
- `docs/ai/NEXT_STEPS.md`

Use those files as the source of truth for AI agent related migration history, accepted decisions, remaining work and validation status.

## Project shape

- Backend apps are `luxethread-api` and `luxethread-batch`.
- Keep the existing NestJS resolver/service/module pattern based on MVC and DI.
- Keep DTOs, enums, schemas under the `apps/luxethread-api/src/libs`.
- Keep shared reusable modules: auth, member, like, comment, follow, view, board article, socket.

## Domain rules

- Use Luxethread/product terminology for the main catalog entity
- Do not reintroduce property or real estate fields 
- Keep `MemberType.USER`, `MemberType.AGENT` and `MemberType.ADMIN` unchanged.
- Product ownership continues to use `MemberType.AGENT` unless a later migration explicity change it.
- Product enum values are:
  - `ProductCategory `: `MEN `, `WOMEN `, `KIDS`, `UNISEX`.
  - `ProductType`: `T_SHIRT`, `SHIRT`, `HOODIE`, `JACKET`, `JEANS`, `TROUSERS`, `DRESS`, `SKIRT`, `SHORTS`, `SHOES`, `BAG`, `ACCESSORY`.
  - `ProductSize`: `XS`, `S`, `M`, `L`, `XL`, `XXL`.
  - `ProductColor`: `BLACK`, `WHITE`, `YELLOW`, `GRAY`, `RED`, `BLUE`, `GREEN`, `BEIGE`, `BROWN`, `PINK`.
  - `ProductMaterial`: `COTTON`, `POLYESTER`, `WOOL`, `DENIM`, `LEATHER`, `LINEN`.
  - `ProductFit`: `SLIM`, `REGULAR`, `OVERSIZED`, `RELAXED`.

## Workflow

1. Anylyze before editing.
2. Keep changes small and consistent with existing project patterns.
3. Do not remove working logic unless it is replaced safely.
4. Update `docs/ai/COMPLETED_TASKS.md` after major completed work.
5. Add or update focused tests when behavior changes.

## Validation 

Use these checks for backend work:

```bash 
npx tsc -p apps/luxethread-api/tsconfig.app.json --noEmit
npx tsc -p apps/luxethread-batch/tsconfig.app.json --noEmit
npx run build
```

`npm run lint` runs ESLint with `--fix`, use it only when file rewriting is acceptable!
