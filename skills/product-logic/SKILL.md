----
name: product-logic
description: Review Luxethread product API consistency across GraphQL operations, DTOs, schemas, enums, filters, return types, and deprecated terminology. Identify deprecated or non-product names in GraphQL operation names, DTO fields, schema names, enum values, and filters, and list each legacy term with its product-term replacement.
---

# Luxethread product api review

Use this skill for review-only passes or pre-edit analysis of product API.

## Review checklist

- Confirm GraphQL operation names use product terminology. Use product terminology when the operation name, field name, enum value, or filter name refers to a product concept such as product, category, size, color, material, or fit. Treat legacy terminology as deprecated or non-product names that should be replaced:
  - `createProduct`, `updateProduct`, `deleteProduct`, `getProduct`, `listProducts`.
  - Also review `getFavorites` and `getVisited` if their return types or field names are product-related, and report them only when they are product-scoped.
- Confirm shared operations such as `getFavorites` and `getVisited` return product data. If `getFavorites` or `getVisited` is missing, report "Not found" instead of inferring its behavior.
- Confirm DTOs, Schemas, Enums agree on product field nullability. If DTO, schema, and enum definitions disagree on a field's nullability or type, report each mismatch with the exact field name and the likely behavior impact for API clients.
- Confirm filters include `productType`, `productCategory`, `productSizes`, `productColors`, `productMaterial`, `productFit`, `minPrice`, and `maxPrice`, and report any missing or mismatched filter names.
- Output only findings supported by code or schema evidence. For each finding, include severity, file path, operation or symbol name, current behavior, expected product-based behavior, and user-visible impact.
