# TODO

- allow feedback from users
- add more locations, think of an API to upload a csv.
- replace mapbox with [govmap](https://api.govmap.gov.il/docs/intro)
- add option for one image per location
- allow user to erase himself, then updated all his visited locations.
- update users permission levels: visitor, editor, approver. by default every one is an editor, and if someone is troublesome, demote him to a visitor.
- per user keep track of his edit count and new locations count
- allow login using Facebook
- when zoom out combine several locations to 1 circle with a count inside
- display the number of edits
- heatmap of visits

## Role promotion — how to make a user an approver

Currently everyone defaults to `'approver'`. Need to decide on a mechanism for when real role differentiation is introduced (default becomes `'editor'`).

**Options to consider:**
- Hardcode a list of approved emails in an env var (`APPROVER_EMAILS=a@b.com,c@d.com`) and set role on login/signup
- Add a one-off admin script to promote a user by email: `node scripts/promote.js user@email.com`
- Expose a `PATCH /api/users/:id/role` endpoint gated behind a superuser check (chicken-and-egg: needs at least one approver seeded first)
- Seed the first approver from an env var (`SUPER_USER_EMAIL`) during DB initialization
