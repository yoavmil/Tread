# TODO

## Per-location creator/editor tracking

Track which user created each location and which users have edited it.

**What's needed:**
- Add `createdBy` (ObjectId ref User) and `editedBy` (ObjectId[] ref User) fields to the Place mongoose schema
- Add real `POST /api/places` and `PUT /api/places/:id` endpoints (currently edits go through a suggest-edit email flow — actual DB writes are needed to attribute changes to users)
- On the place-panel (location info page): display creator first, then editors, deduplicating the creator if they also appear as an editor
- Users can already customize their display name (implemented), so attribution will use that

**Design note:** Decide whether to replace or supplement the existing suggest-edit/suggest-new email flow when adding direct edit endpoints.
