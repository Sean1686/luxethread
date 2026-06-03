# Backend Migration: Nestar to Petoria

## Original Project Summary

| Area | Current Nestar State |
| --- | --- |
| Backend framework | NestJS monorepo with GraphQL, Mongoose, JWT auth, upload support, scheduling, and WebSocket module |
| Apps | `apps/nestar-api` for GraphQL/API, `apps/nestar-batch` for scheduled ranking jobs |
| Domain | Real-estate marketplace centered on `Property` listings and `Agent` members |
| Main entity | `Property` with location, address, square footage, beds, rooms, barter/rent flags, sold status |
| Social features | Likes, views, comments, follows, board articles, notices, notifications |
| Batch jobs | Rank active properties and agents from likes, views, articles, and property counts |

## New Project Summary

Petoria is the requested migration target for the next product state. The backend should become an ecommerce-style platform while preserving the existing NestJS GraphQL architecture.

Important current-state note: a safe branding-layer rename was already completed from `Nestar` to `Luxethread` in visible project labels. The source code still uses `Property`, `Agent`, `apps/nestar-*`, and real-estate API/domain names. Future Petoria work must decide whether to replace the interim Luxethread branding or treat it as a temporary migration layer.

## Backend Migration Goal

Convert the real-estate backend into the Petoria platform without breaking the existing infrastructure:

- Preserve NestJS app structure, GraphQL-first API style, Mongoose models, auth, uploads, comments, likes, views, follows, and batch scheduling.
- Replace real-estate domain concepts with Petoria domain concepts.
- Add or rename schemas, DTOs, resolvers, services, enums, and batch ranking logic only when the target Petoria domain is confirmed.
- Avoid collection/API breaking changes until a compatibility or migration strategy is chosen.

## Naming Changes

| Current Name | Interim State | Petoria Target | Notes |
| --- | --- | --- | --- |
| `nestar` package name | `luxethread` | `petoria` or selected package id | Package metadata changed once already; Petoria rename is pending. |
| `NestarBatchController` | `LuxethreadBatchController` | `PetoriaBatchController` | Safe visible rename completed to Luxethread. |
| `nestar-api` Nest project key | `luxethread-api` | `petoria-api` | Physical folder remains `apps/nestar-api`. |
| `nestar-batch` Nest project key | `luxethread-batch` | `petoria-batch` | Physical folder remains `apps/nestar-batch`. |
| `Property` | unchanged | Petoria core entity TBD | Do not rename until target domain model is decided. |
| `Agent` / `MemberType.AGENT` | unchanged | Seller/vendor/admin role TBD | Role migration depends on Petoria business model. |
| Welcome strings | Luxethread | Petoria | API and batch welcome strings are currently Luxethread. |

## Module Changes

| Module | Current Role | Petoria Migration Direction |
| --- | --- | --- |
| `PropertyModule` | Real-estate listings | Rename or replace with the Petoria catalog module once target entity is defined. |
| `MemberModule` | Users, agents, admins | Keep auth/member base; decide whether `AGENT` becomes seller/vendor or is removed. |
| `LikeModule` | Likes/favorites for member, property, article | Keep infrastructure; replace `PROPERTY` group with target Petoria entity group. |
| `ViewModule` | Unique member views | Keep infrastructure; replace property lookup with target entity lookup. |
| `CommentModule` | Comments on members, articles, properties | Keep infrastructure; retarget property comments to Petoria entity comments. |
| `BoardArticleModule` | Community/articles | Likely reusable; retheme categories only if needed. |
| `FollowModule` | Member follow graph | Reusable if Petoria keeps seller/member profiles. |
| `BatchModule` | Property and agent ranking jobs | Retarget ranking to Petoria entities and roles. |

## GraphQL Changes

Current APIs are intentionally unchanged after the safe branding pass.

| Current GraphQL Surface | Petoria Direction |
| --- | --- |
| `createProperty`, `getProperty`, `getProperties`, `updateProperty` | Rename only after backend compatibility strategy is chosen. |
| `getAgentProperties` | Rename to owner/seller catalog query if Petoria has sellers. |
| `getFavorites`, `getVisited` | Can remain generic, but return type should eventually be Petoria entity list. |
| `likeTargetProperty` | Retarget to Petoria entity likes. |
| `PropertyInput`, `PropertyUpdate`, `PropertiesInquiry` | Replace real-estate fields with Petoria fields. |
| `PropertyType`, `PropertyStatus`, `PropertyLocation` | Replace with Petoria enums. |

Compatibility strategy options:

- Keep old GraphQL names temporarily and map them to new service internals.
- Introduce new Petoria GraphQL names while keeping old names deprecated.
- Perform a hard rename once the frontend migration is ready.

## MongoDB Collection and Schema Changes

Current safe rename did not change database collections or domain schemas.

| Current Collection | Current Schema | Petoria Direction |
| --- | --- | --- |
| `properties` | `PropertySchema` | Keep until migration scripts and API compatibility are planned. |
| `members` | `MemberSchema` | Reuse; adjust role enum and counters when target domain is confirmed. |
| `likes` | Generic ref with `likeGroup` | Reuse; group enum must include target Petoria entity. |
| `views` | Generic ref with `viewGroup` | Reuse; group enum must include target Petoria entity. |
| `comments` | Generic ref with `commentGroup` | Reuse; group enum must include target Petoria entity. |
| `notifications` | Includes `propertyId` | Add or rename target entity ref after notification behavior is defined. |

The `.env` Mongo database target was not edited during the safe rename. Do not change database names without an explicit data migration plan.

## Compatibility Notes

- Physical folders remain `apps/nestar-api` and `apps/nestar-batch`.
- Absolute imports still reference `apps/nestar-api`; this is intentional under the safe layer.
- GraphQL schema names still expose real-estate concepts.
- `PropertyService.getVisited` currently routes to favorite properties instead of the view service; fix during domain cleanup.
- `LikeSchema` imports `ViewGroup` for `likeGroup`; this should be corrected when group enums are retargeted.
- `ViewInput` decorates `viewRefId` with `ViewGroup`; fix during DTO cleanup.
- Existing `test:e2e` script points to `apps/nestars-api`, which appears to be a typo and remains unfixed unless validation requires it.
