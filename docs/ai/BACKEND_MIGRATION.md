# Backend Migration: Property To Luxethread Product

## Current Project Summary

Luxethread is now a NestJS GraphQL ecommerce clothing backend. The main catalog domain has been migrated from real-estate `Property` concepts to clothing `Product` concepts while preserving the existing NestJS resolver/service/module architecture, Mongoose models, auth, uploads, likes, views, comments, follows, board articles, sockets, and scheduled batch jobs.

## Current Backend State

| Area | Current State |
| --- | --- |
| Apps | `apps/luxethread-api` and `apps/luxethread-batch` |
| Main catalog entity | `Product` |
| Product owner role | `MemberType.AGENT` |
| Member roles | `MemberType.USER`, `MemberType.AGENT`, and `MemberType.ADMIN` unchanged |
| Product collection | `products` |
| Social collections | Existing `likes`, `views`, and `comments` collections retarget product refs through group enums |
| Batch jobs | Rank active products and active agent members |

## Product Domain

The product schema/DTO surface uses:

- `productCategory`, `productType`, `productSizes`, `productColors`, `productMaterial`, `productFit`
- `productOrigin`, storing clean origin values like `Turkey` or `Italy`
- `productTitle`, `productPrice`, `productImages`, `productDesc`
- `productStatus`, `productViews`, `productLikes`, `productComments`, `productRank`
- `memberId`, `soldAt`, `deletedAt`, timestamps

Real-estate fields such as address, location, square, beds, rooms, barter, rent, and constructed date are no longer part of the product catalog schema or GraphQL DTOs.

## GraphQL Surface

| Operation | Purpose |
| --- | --- |
| `createProduct` | Agent-owned product creation |
| `getProduct` | Product detail lookup and view recording |
| `listProducts` | Public product listing with product filters |
| `updateProduct` | Agent product update |
| `getAgentProducts` | Agent-owned product list |
| `likeTargetProduct` | Toggle product favorite/like |
| `getFavorites` | Authenticated member favorite products |
| `getVisited` | Authenticated member visited products |
| `getAllProductsByAdmin` | Admin product listing |
| `updateProductByAdmin` | Admin product update |
| `removeProductByAdmin` | Admin hard-delete for deleted products |

## Product Enums And Filters

Product enums are:

- `ProductCategory`: `MEN`, `WOMEN`, `KIDS`, `UNISEX`
- `ProductType`: `T_SHIRT`, `SHIRT`, `HOODIE`, `JACKET`, `JEANS`, `TROUSERS`, `DRESS`, `SKIRT`, `SHORTS`, `SHOES`, `BAG`, `ACCESSORY`
- `ProductSize`: `XS`, `S`, `M`, `L`, `XL`, `XXL`
- `ProductColor`: `BLACK`, `WHITE`, `YELLOW`, `GRAY`, `RED`, `BLUE`, `GREEN`, `BEIGE`, `BROWN`, `PINK`
- `ProductMaterial`: `COTTON`, `POLYESTER`, `WOOL`, `DENIM`, `LEATHER`, `LINEN`
- `ProductFit`: `SLIM`, `REGULAR`, `OVERSIZED`, `RELAXED`
- `ProductStatus`: `ACTIVE`, `SOLD`, `DELETE`

`listProducts` supports product category/type/sizes/colors/material/fit filters, origin text search through `productOrigin`, `minPrice`, `maxPrice`, and text search on `productTitle`.

## Compatibility Notes

- This was a hard backend migration; old `Property` GraphQL aliases were not kept.
- Existing Mongo `properties` documents were not migrated automatically.
- `MemberType.AGENT` intentionally remains the product owner role.
- Build output may still contain old `dist/apps/nestar-*` artifacts from previous builds; source paths now use `apps/luxethread-*`.
