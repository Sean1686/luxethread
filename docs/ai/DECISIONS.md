# Migration Decisions

## Accepted Decisions

| Decision | Current Outcome |
| --- | --- |
| Final backend target is Luxethread clothing ecommerce | Petoria is no longer the active backend target in this workspace |
| Main catalog entity is `Product` | Real-estate `Property` source names were replaced in backend source |
| Keep `MemberType.USER`, `MemberType.AGENT`, and `MemberType.ADMIN` unchanged | `MemberType.AGENT` remains the product owner role |
| Use a hard backend GraphQL rename | Old `Property` operations and DTO names were not preserved as aliases |
| Use a new `products` collection | Old `properties` documents are not migrated automatically |
| Preserve reusable social modules | Likes, views, and comments now use `PRODUCT` groups |
| Preserve product status lifecycle from property status | `ProductStatus.ACTIVE`, `SOLD`, and `DELETE` are used |
| Use build/typecheck validation | API and batch TypeScript checks pass; build passes with elevated dist cleanup |

## Current Product Outcomes

| Area | State |
| --- | --- |
| Catalog module | `ProductModule`, `ProductResolver`, `ProductService` |
| Product DTOs | `Product`, `Products`, `ProductInput`, `ProductUpdate`, `ProductsInquiry` |
| Product GraphQL operations | `createProduct`, `getProduct`, `listProducts`, `updateProduct`, agent/admin product operations |
| Social groups | `LikeGroup.PRODUCT`, `ViewGroup.PRODUCT`, `CommentGroup.PRODUCT`, `NotificationGroup.PRODUCT` |
| Member counters | `memberProducts` |
| Batch ranking | `batchTopProducts`; agent rank uses `memberProducts` |

## Remaining Decision Points

| Open Decision | Recommended Default |
| --- | --- |
| Old data migration | Plan a separate script only if `properties` documents must become `products` |
| Frontend compatibility | Update the frontend to the new product GraphQL operations instead of relying on old aliases |
| Product availability naming | Keep `ProductStatus.SOLD` unless the product team requests `SOLD_OUT` or another ecommerce term |
