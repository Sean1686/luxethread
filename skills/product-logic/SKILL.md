----
name: product-logic
description: Review Luxethread product API consistency across GraphQL operations, DTO, Schema, enum, filter and remaining legacy terminology.
----

# Luxethread product api review

Use this skill for review-only passes or pre-edit analysis of product API.

## Review checklist

- Confirm GraphQL operation names use product terminology:
  - `createProduct`, `updateProduct`, `deleteProduct`, `getProduct`, `listProducts`.
  - and where it is related 
- Confirm shared operations such as `getFavorites` and `getVisited` return product data.
- Confirm DTOs, Schemas, Enums agree on product fields nullability.
- Confirm filters use product type, product category, product size, product color, product material, product fit, prices and etc.
- Report real findings with paths and behavior impact.