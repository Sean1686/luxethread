# Frontend Migration Plan: Nestar to Petoria

No Next.js frontend source was found in the current workspace. This plan is written for the expected paired frontend and should be applied once that repository or app is available.

## Step-by-Step Plan

| Step | Task | Output |
| --- | --- | --- |
| 1 | Inventory all frontend routes, components, GraphQL operations, generated types, and text containing Nestar or real-estate terms | Frontend migration map |
| 2 | Freeze current backend GraphQL schema before changes | Baseline schema artifact |
| 3 | Decide Petoria domain language | Approved glossary |
| 4 | Rename visible brand text from Nestar/Luxethread to Petoria | UI branding update |
| 5 | Map real-estate pages to Petoria pages | Route-level migration plan |
| 6 | Introduce new GraphQL operations or aliases | API compatibility bridge |
| 7 | Update generated GraphQL types | Fresh frontend type output |
| 8 | Replace UI filters and forms | Petoria-specific listing/search UX |
| 9 | Update images/upload targets if backend changes them | Asset upload consistency |
| 10 | Run frontend tests, visual checks, and GraphQL smoke tests | Verified frontend migration |

## Page and Component Mapping

Exact frontend paths are unknown, so these are expected mappings for a Nestar real-estate frontend.

| Old Nestar Page/Component | Petoria Target | Notes |
| --- | --- | --- |
| Home / property discovery | Petoria home / catalog discovery | Replace property hero and listing cards with Petoria domain cards. |
| Property list page | Petoria catalog/list page | Retarget filters and sorting. |
| Property detail page | Petoria entity detail page | Replace address/rooms/beds/square fields. |
| Create property page | Create Petoria listing/product page | Keep auth guard if seller/provider role remains. |
| Agent profile page | Seller/provider/member profile page | Depends on target role model. |
| Agent properties section | Seller/provider listings section | Rename labels and GraphQL query. |
| Favorites page | Favorites or saved Petoria items | Backend query may remain generic temporarily. |
| Visited properties page | Recently viewed Petoria items | Should use view-backed query after backend cleanup. |
| Admin properties table | Admin Petoria catalog table | Keep admin-only access. |
| Upload property images | Upload Petoria entity images | Upload target should only change after backend support exists. |
| Property filter sidebar | Petoria filter sidebar | Replace location/type/rooms/beds/square filters. |

## GraphQL Query and Mutation Rename Plan

| Current Operation | Petoria Operation | Compatibility Recommendation |
| --- | --- | --- |
| `getProperty` | `getPetoriaItem` or final domain-specific name | Add new operation and keep old temporarily. |
| `getProperties` | `getPetoriaItems` | Keep pagination shape if possible. |
| `createProperty` | `createPetoriaItem` | Rename input after backend schema changes. |
| `updateProperty` | `updatePetoriaItem` | Keep admin/member permissions equivalent during first pass. |
| `getAgentProperties` | `getSellerItems` or `getMyItems` | Depends on role model. |
| `getAllPropertiesByAdmin` | `getAllPetoriaItemsByAdmin` | Admin table migration. |
| `updatePropertyByAdmin` | `updatePetoriaItemByAdmin` | Admin mutation migration. |
| `removePropertyByAdmin` | `removePetoriaItemByAdmin` | Admin mutation migration. |
| `likeTargetProperty` | `likeTargetPetoriaItem` | Update group enum after backend changes. |
| `getFavorites` | Keep or rename to `getFavoritePetoriaItems` | Generic name can remain if return type changes. |
| `getVisited` | Keep or rename to `getVisitedPetoriaItems` | Backend should use view service. |

## UI Terminology Changes

| Old Term | Interim Source State | Petoria Direction |
| --- | --- | --- |
| Nestar | Luxethread in backend labels | Petoria |
| Property | Property | Petoria entity name TBD |
| Properties | Properties | Catalog/items/listings TBD |
| Agent | Agent | Seller/provider/admin TBD |
| Location | PropertyLocation | Petoria category/filter TBD |
| Address | PropertyAddress | Remove or replace with applicable field |
| Rooms | PropertyRooms | Replace with domain-specific attribute |
| Beds | PropertyBeds | Replace with domain-specific attribute |
| Square | PropertySquare | Replace with domain-specific attribute |
| Rent | PropertyRent | Replace with applicable flag |
| Barter | PropertyBarter | Replace with applicable flag |
| Sold | PropertyStatus.SOLD | Sold out/unavailable/adopted/reserved, depending on domain |

## Frontend Validation

- Confirm no visible `Nestar`, `Luxethread`, or real-estate copy remains after final Petoria rename.
- Confirm GraphQL generated types match backend schema.
- Confirm list, detail, create, edit, favorite, visited, and admin flows work.
- Confirm old operations still work during compatibility window if aliases are provided.
