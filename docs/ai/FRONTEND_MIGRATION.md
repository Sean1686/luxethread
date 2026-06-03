# Frontend Migration Plan: Luxethread Products

No Next.js frontend source was found in the current workspace. This plan is for the paired frontend once it is available.

## Current Backend Contract

The backend now exposes Luxethread product catalog operations:

- `createProduct`, `getProduct`, `listProducts`, `updateProduct`
- `getAgentProducts`
- `likeTargetProduct`
- `getAllProductsByAdmin`, `updateProductByAdmin`, `removeProductByAdmin`
- `getFavorites` and `getVisited`, both returning product lists

## Frontend Work

| Area | Required Update |
| --- | --- |
| Catalog pages | Replace old listing/detail/create/edit pages with product title, price, origin, category, type, sizes, colors, material, fit, images, and description. |
| GraphQL operations | Use the product operation names and regenerate GraphQL types from the backend schema. |
| Filters | Use product category, type, `productSizes`, `productColors`, material, fit, `productOrigin`, `minPrice`, `maxPrice`, and product title text search. |
| Member dashboard | Replace owned listing counts with `memberProducts`; keep agent ownership semantics. |
| Favorites and visited | Keep generic page names if desired, but render product list item fields. |
| Admin catalog | Use product admin queries/mutations and product fields. |
| Uploads | Use `product` as the upload target. |

Display `productOrigin` as `Made in ${productOrigin}` in product cards and detail pages. Render `productSizes` as checkboxes or a multi-select and `productColors` as swatches, checkboxes, or a multi-select on create/edit forms.

## Validation

- Confirm no frontend GraphQL operation still calls old catalog names.
- Confirm no UI form still submits real-estate-only fields.
- Confirm generated types include the product enums and product DTOs.
- Confirm list, detail, create, edit, favorite, visited, and admin flows work against the backend.
