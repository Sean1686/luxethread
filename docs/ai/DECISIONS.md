# Migration Decisions

## Architectural Decisions

| Decision | Why It Was Made | Risks | Alternatives |
| --- | --- | --- | --- |
| Keep application source code unchanged for this documentation task | User explicitly requested documentation only | Docs may describe pending work that code does not yet implement | Implement source changes in the same pass, but that would violate the request |
| Treat Petoria as the requested future target | The latest request names the migration as Nestar to Petoria | Earlier session context referenced Luxethread, creating a naming conflict | Ask for clarification before documenting; document both states instead |
| Record Luxethread as an interim completed branding layer | The completed refactor changed visible Nestar labels to Luxethread | Future engineers may confuse Luxethread with the final target | Rename immediately to Petoria, but that would be a new source-code change |
| Preserve physical folders `apps/nestar-api` and `apps/nestar-batch` during safe branding | The approved plan selected config/scripts-only rename | Lowercase `nestar` remains in paths and imports | Rename folders and update imports, with larger blast radius |
| Keep GraphQL APIs unchanged during safe branding | Avoid frontend/API breaking changes | Public schema still exposes real-estate terms | Add new aliases and deprecate old APIs |
| Keep MongoDB collections unchanged | Avoid data migration and runtime storage changes | Collections like `properties` remain domain-inaccurate | Create new collections and migrate data |
| Keep database target unchanged unless explicitly approved | Prevent accidental runtime data switch | Local `.env` may already differ from documentation assumptions | Rename DB as part of a managed migration |
| Preserve reusable social modules | Likes, views, comments, follows, articles, and auth are domain-agnostic enough to reuse | Generic modules currently contain property-specific lookup names | Rebuild social layer around new Petoria entities |
| Defer target Petoria domain model until confirmed | Petoria product type is not specified in the code or prompt | Docs cannot define exact schemas safely | Infer a pet-commerce model and proceed |
| Use build as typecheck validation | No dedicated `typecheck` script exists | Build can be blocked by dist permissions or bundler config | Add a `typecheck` script later |

## Completed Decision Outcomes

| Outcome | Current State |
| --- | --- |
| Package name | Changed from `nestar` to `luxethread` |
| Nest project keys | Changed to `luxethread-api` and `luxethread-batch` |
| Batch controller label | Changed to `LuxethreadBatchController` |
| API/batch welcome strings | Changed to Luxethread |
| Domain names | Still real-estate: `Property`, `Agent`, `PropertyType`, `PropertyLocation`, etc. |
| Collections | Still unchanged, including `properties` |

## Recommended Petoria Decision Points

| Open Decision | Recommended Default | Reason |
| --- | --- | --- |
| Final brand in source | Rename Luxethread visible labels to Petoria in a second safe pass | Latest request uses Petoria |
| Petoria domain | Define exact domain before schema changes | Prevents wrong assumptions about products, pets, services, or adoption flow |
| API compatibility | Add new Petoria APIs and keep old Nestar APIs deprecated temporarily | Reduces frontend migration risk |
| Data migration | Use migration scripts instead of ad hoc collection renames | Safer for production-like MongoDB data |
| Role model | Keep `USER` and `ADMIN`; decide whether `AGENT` becomes seller/provider | Avoids premature role deletion |
