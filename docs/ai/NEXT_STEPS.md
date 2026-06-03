# Next Steps

## Backend Follow-Up

| Priority | Task | Notes |
| --- | --- | --- |
| P0 | Confirm frontend migration needs | Backend GraphQL now exposes product operation names without property aliases. |
| P1 | Add focused product tests | Cover create/get/list/update, product filters, favorites, visited, likes/comments/views, and batch ranking. |
| P1 | Decide whether old data needs migration | Current backend writes to `products`; old `properties` data is untouched. |
| P2 | Decide whether `ProductStatus.SOLD` should become an ecommerce-specific term | Keep current status values until explicitly changed. |

## Frontend Migration

| Priority | Task | Notes |
| --- | --- | --- |
| P0 | Update GraphQL operations to product names | Use `createProduct`, `getProduct`, `listProducts`, `updateProduct`, product agent/admin operations. |
| P0 | Replace real-estate fields in forms and cards | Use category, type, sizes, colors, material, fit, origin, price, title, images, and description. |
| P1 | Regenerate GraphQL types from the backend schema | Prevent stale property DTO/type usage. |
| P1 | Update upload target to `product` | Backend examples now use product terminology. |

## Validation

| Command | Current Status |
| --- | --- |
| `npx tsc -p apps/luxethread-api/tsconfig.app.json --noEmit` | Passing |
| `npx tsc -p apps/luxethread-batch/tsconfig.app.json --noEmit` | Passing |
| `npm run build` | Passing after elevated rerun to clean dist artifacts |
| `npm run lint` | Not run; it uses ESLint `--fix` and rewrites files |
