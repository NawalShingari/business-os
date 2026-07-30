# BusinessOS database architecture (Version 1)

## Scope and tenancy

BusinessOS is a multi-tenant platform. A **Business** is the tenant boundary: every operational record is owned by one business and must only be readable or writable within that business. The MVP uses the internal term **Client** everywhere. The presentation layer may label it *Patient* for a clinic, *Customer* for a salon, or *Client* for a legal practice without changing the stored entity.

This document describes the target data architecture only. It does not define a database schema, models, or migrations.

## 1. Version 1 entity list

| Entity | Version 1 purpose |
| --- | --- |
| Business | The tenant and business profile. |
| User | A person who can authenticate to BusinessOS. |
| Business membership | The association between a user and a business, including their MVP access level. |
| Client | A customer/patient/contact served by one business. |
| Appointment | A scheduled service interaction between a business and a client. |
| Payment | A payment recorded for an appointment. |
| Notification | An in-app or outbound communication requested for a user or client. |

### Deliberate Version 1 non-entities

Dashboard data and first-version analytics should be calculated from the entities above; they do not need their own persistent tables. The first AI Assistant can be stateless and use the current business context. Business Memory and persistent AI conversations are deferred so their retention, consent, and retrieval rules can be designed deliberately.

## 2. Entity responsibilities

### Business

- **Why it exists:** establishes the tenant boundary and represents the organization operating on the platform.
- **What it stores:** display name, business category, timezone, locale, contact details, operational status, and configuration needed across the product.
- **Modules:** Business, Dashboard, Users, Clients, Appointments, Payments, Notifications, Analytics, and AI Assistant.

### User

- **Why it exists:** represents one authenticated human; it must not be duplicated merely because that person works for more than one business.
- **What it stores:** identity and authentication-related profile data such as name, email or other login identifier, verification state, and account status. Credential/session handling is an authentication concern and should be isolated from operational records.
- **Modules:** Authentication, Users, Dashboard, Notifications, and AI Assistant.

### Business membership

- **Why it exists:** a user may belong to multiple businesses, and a business has multiple users. The association is therefore a first-class entity rather than a field on User.
- **What it stores:** business reference, user reference, membership status, MVP role/access level (for example owner or staff), invitation/activation information, and membership timestamps.
- **Modules:** Authentication, Business, Users, Dashboard, and authorization checks in every business-scoped module.

### Client

- **Why it exists:** holds the person or organization receiving a business's services, independent of the frontend label selected by the business type.
- **What it stores:** business reference, name, contact details, preferred contact channel, notes appropriate to the business, lifecycle status, and optional external reference. Clinic-specific clinical data is intentionally out of scope.
- **Modules:** Clients, Appointments, Payments, Notifications, Dashboard, Analytics, and AI Assistant context.

### Appointment

- **Why it exists:** records a planned interaction and is the operational anchor for scheduling and payments.
- **What it stores:** business reference, client reference, optionally the responsible business member, start and end time, timezone-aware scheduling information, status, internal note, and cancellation/rescheduling metadata when needed.
- **Modules:** Appointments, Dashboard, Payments, Notifications, Analytics, and AI Assistant context.

### Payment

- **Why it exists:** records money received or expected in relation to a completed, scheduled, or cancelled appointment without making the appointment itself a financial record.
- **What it stores:** business reference, appointment reference, amount, currency, payment method, payment status, external transaction/reference identifier, and received/recorded timestamps.
- **Modules:** Payments, Dashboard, Analytics, and Notifications.

### Notification

- **Why it exists:** records a communication request and its delivery outcome, making reminders and operational notices traceable.
- **What it stores:** business reference, recipient type and recipient reference (user or client), channel, template/category, payload or rendered summary, scheduled time, delivery status, provider message reference, and failure information.
- **Modules:** Notifications, Appointments, Payments, Dashboard, and Analytics.

## 3. Relationships

- A **Business** owns many Business memberships, Clients, Appointments, Payments, and Notifications.
- A **User** has many Business memberships and can therefore work in many Businesses.
- A **Business membership** belongs to exactly one Business and exactly one User.
- A **Business** has many Clients; a Client belongs to exactly one Business.
- A **Client** has many Appointments; an Appointment belongs to exactly one Client and one Business.
- An **Appointment** may be assigned to zero or one Business membership in Version 1; the membership may have many Appointments. The assignment is optional so the model supports businesses that do not allocate a staff member yet.
- An **Appointment** can have zero or more Payments; every Payment belongs to one Appointment and one Business.
- A **Notification** belongs to one Business and targets one User or one Client. It may optionally reference an Appointment or Payment as its triggering context.

## 4. Business rules

- Tenant isolation is mandatory: a record may never reference a Business, Client, Appointment, Payment, Notification recipient, or membership from another business.
- A User must have an active Business membership before acting within that Business.
- One Client belongs to one Business. The same real-world person at two businesses is represented by two Client records unless a future consented identity-sharing feature is introduced.
- One Appointment belongs to exactly one Client and one Business. Its client and assigned membership, if present, must belong to the same Business.
- Appointment start time must precede end time; all scheduling calculations must use the Business timezone while preserving an absolute instant for reliable reporting.
- Appointment status transitions must be controlled (for example scheduled, completed, cancelled, no-show) and cancellation must preserve history rather than overwrite it.
- A Payment cannot exist without an Appointment, and its Business must equal the Appointment's Business. A single appointment may have partial or multiple payments.
- Payment amounts are positive, currency is explicit, and payment status must distinguish pending, succeeded, failed, refunded, and voided rather than deleting financial history.
- A Notification has one valid recipient and channel. Delivery attempts and failures must not be represented as a new business transaction.
- User accounts and memberships are different lifecycles: disabling a membership removes access to one business, while disabling a User affects authentication across all businesses.

## 5. Future scalability candidates (do not implement now)

- **Role** and **Permission** for configurable, granular authorization beyond MVP membership levels.
- **Invitation** for a separate, auditable user-onboarding workflow.
- **Service catalog**, **staff availability**, **working hours**, **locations**, and **calendar blocks** for richer scheduling.
- **Invoice**, **invoice line**, **refund**, **payment attempt**, and **tax record** for full billing and accounting flows.
- **Document** and **document version** for uploaded files, consent forms, or case material.
- **Task**, **project**, and **project membership** for non-appointment business workflows.
- **Client address**, **client tag**, **custom field definition**, and **custom field value** for industry-specific data without changing the core Client entity.
- **AI conversation**, **AI message**, **business memory item**, **knowledge source**, and **retrieval citation** for persistent, consent-aware AI interactions.
- **Audit log** and **security event** for compliance-grade change history and sensitive access monitoring.
- **Webhook event** and **integration connection** for payment, calendar, messaging, and CRM integrations.

## 6. Design risks to avoid

- Do not put `business_id` only on top-level records and rely on application joins for isolation; every business-owned operational entity needs a direct tenant boundary.
- Do not create clinic-specific tables or fields in the generic core. Use a future extension/custom-field design after real cross-industry requirements are known.
- Do not place a single `user_id` on Business; that prevents multi-user teams and multi-business users.
- Do not make payments a single amount/status field on Appointment; it cannot represent deposits, split payments, retries, or refunds.
- Do not store timestamps without timezone discipline or derive business day reporting from server local time.
- Do not use mutable email addresses as primary identity keys, or expose sequential IDs in public URLs.
- Do not hard-delete financial, notification-delivery, or audit-relevant records when status/history is needed.
- Do not persist unrestricted AI prompts, outputs, or client-sensitive information without retention, consent, access, and redaction rules.
- Do not add analytics summary tables prematurely; first validate definitions against transactional data to avoid inconsistent metrics.

## 7. Recommendations

### Indexing

- Index every foreign-key reference, especially `business_id` on all tenant-owned entities.
- Use composite indexes beginning with `business_id` for common scoped views: Clients by status/name, Appointments by status and start time, Payments by status and received time, and Notifications by delivery status and scheduled time.
- Enforce unique membership per `(business, user)` and unique active login identifier for User according to the chosen authentication policy.
- Add a unique constraint/index for external payment transaction references only when the provider guarantees uniqueness; scope it to the business or provider as appropriate.
- Add search indexes only after query patterns are measured. For Version 1, a normalized client name plus a business-scoped lookup is sufficient; do not introduce a search engine prematurely.

### Naming

- Use singular, descriptive entity names in the application and consistent lowercase `snake_case` names for database identifiers.
- Use `<entity>_id` for references, `created_at` and `updated_at` for lifecycle timestamps, and `*_at` for event times.
- Use explicit status names and controlled enumerations; avoid ambiguous booleans such as `is_active` when a lifecycle has more than two states.

### UUIDs

- Use UUID primary keys generated by the database or a trusted application boundary, consistently across all entities.
- Prefer time-ordered UUIDs (for example UUIDv7) when supported, because they retain global uniqueness while improving insertion locality and keeping identifiers safe for public exposure.
- Never encode business meaning, tenant identity, or personal information in an identifier.

### Timestamps

- Store all event and lifecycle timestamps as timezone-aware UTC instants.
- Store the Business timezone separately for scheduling display and business-day reporting.
- Include `created_at` and `updated_at` on all mutable entities. Add domain timestamps such as `scheduled_at`, `cancelled_at`, `paid_at`, and `sent_at` only when they describe distinct business events.

### Soft deletion

- Use a nullable `deleted_at` timestamp for soft-deletable operational records such as Clients and optional business configuration, paired with default queries that exclude deleted records.
- Do not soft-delete transactions or immutable delivery/audit history; represent reversals, cancellations, or archival states explicitly.
- Decide and document uniqueness behavior for soft-deleted records (for example whether a deleted client's external reference may be reused) before implementation.
