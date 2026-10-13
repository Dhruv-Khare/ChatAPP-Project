# QA Regression Report

Date: 2026-06-17

## Test Coverage Status

The repository currently does not include a unit test framework or test scripts for either app:

- `chattu/client`: has `lint`, `build`, `dev`, and `preview`
- `chattu/server`: has `start`, `dev`, and `debug`

Because no Jest/Vitest/React Testing Library/Supertest setup exists, the completed regression pass used the available gates:

- Frontend lint: `npm --prefix chattu/client run lint`
- Frontend production build: `npm --prefix chattu/client run build`
- Backend syntax sweep: `node --check` over all server source `.js` files excluding `node_modules`

## Current Result

Priority: P0
Status: Passed

- Frontend lint now passes with `0` errors and `0` warnings.
- Frontend production build passes.
- Backend source syntax check passes.

## Fixed Issues

Priority: P0 - Deployed API/runtime crashes
Status: Fixed

- Removed the client-side broken validator code in `client/src/redux/api/api.js` where `param` was referenced without being imported.
- Fixed `availableFriends` endpoint URL from `user/friendschatId=...` to `user/friends?chatId=...`.
- Changed socket client setup to use the shared `server` config instead of hard-coding `https://15-207-16-76.nip.io`.
- Filtered invalid one-to-one chats with missing other users instead of rendering `Deleted User`.
- Hardened backend ObjectId comparisons in chat membership checks.
- Fixed message attachment deletion query typo from `attachement` to `attachements`.
- Fixed unreachable upload limit validation in `sendMessage`.
- Made `NODE_ENV` parsing safe when the variable is absent.
- Added guards around missing avatars, missing users, missing chats, and missing populated references in user/admin controllers.
- Corrected admin chat message counting to count `Message` documents for each chat, not the chat document itself.

Priority: P1 - Frontend regression risks
Status: Fixed

- Cleared all lint errors from unused imports/variables.
- Fixed React Hook rule issue by renaming socket context access from `getSocket` to `useSocket`.
- Split theme and socket hooks/context helpers out of component-export files to clear Fast Refresh warnings.
- Fixed stale hook dependency warnings in chat layout and chat page effects.
- Fixed `ALERT` handling in `Chat.jsx` so alert messages append to the messages list instead of corrupting the input text state.
- Fixed `flexGlow` typo to `flexGrow` in `USerItem.jsx`.
- Improved RTK Query error handling so backend messages are shown instead of always falling back to `Something went wrong`.

Priority: P2 - Local/deployed auth behavior
Status: Fixed

- Local dev now uses non-secure cookies with `sameSite: "lax"`.
- Production keeps secure cross-site cookies.
- CORS supports allowed localhost and deployed frontend origins with credentials.
- Server `dev` script now runs with `NODE_ENV=DEVELOPMENT`.

## Remaining Items

Priority: P1 - Add real automated tests
Status: Not implemented

There is still no unit/integration test suite. Recommended next tests:

- Server: add Supertest tests for login, `GET /api/v1/user/me`, `GET /api/v1/chat/my`, group member add/remove, delete chat, and admin stats.
- Client: add Vitest + React Testing Library tests for login flow, protected routes, chat list rendering, search, notifications, group dialogs, and RTK Query error display.
- Socket: add focused tests or a small integration harness for join/leave, typing, and new message events.

Priority: P2 - Production bundle size
Status: Open

Vite build passes, but reports chunks over 500 kB. This is not breaking the page, but it can slow first load. Consider manual chunks for MUI, charts, and admin-only pages.

Priority: P2 - End-to-end browser testing
Status: Not run

No live local server/database was started during this pass. A full system test still needs a running MongoDB-backed backend and frontend preview/dev server, then browser testing for:

- Login and page refresh persistence
- Chat sidebar load
- Opening a chat
- Sending a text message
- New group creation
- Add/remove group member
- Friend search and request accept/reject
- Admin dashboard/table pages

Priority: P3 - Console logging cleanup
Status: Partially fixed

Several high-noise frontend logs were removed while fixing lint. Some backend operational logs remain. Decide whether to keep them for server observability or replace them with structured/debug-level logging.
