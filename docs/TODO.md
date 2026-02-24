# TODO

- change existing location coordinates
- heatmap of visits
- add more locations, think of an API to upload a csv.
- change landing page, to see the map, and only when the user wants to update his visited status request to login
- pay for render hosting to prevent downtime
- add option for one image per location
- when erasing a location, make sure the user visited list is updated.
- allow user to erase himself, then updated all his visited locations.
- an about page
    - why is it different from Amud Anan and Google Maps
- update users permission levels: visitor, editor, approver. by default every one is an editor, and if someone is troublesome, demote him to a viewer.
- per user keep track of his edit count and new locations count
- allow login using Facebook
- allow feedback from users
- display the number of edits
- merge edits and new location display

## Per-location creator/editor tracking

Track which user created each location and which users have edited it.

**What's needed:**
- Add `createdBy` (ObjectId ref User) and `editedBy` (ObjectId[] ref User) fields to the Place mongoose schema
- Add real `POST /api/places` and `PUT /api/places/:id` endpoints (currently edits go through a suggest-edit email flow — actual DB writes are needed to attribute changes to users)
- On the place-panel (location info page): display creator first, then editors, deduplicating the creator if they also appear as an editor
- Users can already customize their display name (implemented), so attribution will use that

**Design note:** Decide whether to replace or supplement the existing suggest-edit/suggest-new email flow when adding direct edit endpoints.

## Role promotion — how to make a user an approver

Currently everyone defaults to `'approver'`. Need to decide on a mechanism for when real role differentiation is introduced (default becomes `'editor'`).

**Options to consider:**
- Hardcode a list of approved emails in an env var (`APPROVER_EMAILS=a@b.com,c@d.com`) and set role on login/signup
- Add a one-off admin script to promote a user by email: `node scripts/promote.js user@email.com`
- Expose a `PATCH /api/users/:id/role` endpoint gated behind a superuser check (chicken-and-egg: needs at least one approver seeded first)
- Seed the first approver from an env var (`SUPER_USER_EMAIL`) during DB initialization
