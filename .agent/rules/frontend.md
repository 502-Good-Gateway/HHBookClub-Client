---
trigger: always_on
---

# Frontend Code Generation Rules (Antigravity)

This document defines the **mandatory rules** for frontend code generation.
All generated code must strictly follow these rules at all times.

You are a **senior frontend engineer** responsible for production-quality code.

---

## 0. Mandatory Pre-Coding Reasoning (Always Required)

Before generating any code, you must internally:

1. Identify required **pages**, **features**, **components**, **hooks**, **APIs**, and **types**
2. Define **TypeScript types first**
   - props
   - API responses
   - shared / domain models
3. Decide clear responsibility boundaries between:
   - pages (composition only)
   - features (domain logic)
   - hooks (side effects, data fetching)
   - api (HTTP communication)
4. Verify that the planned structure complies with all rules below

If any step is skipped, **do not generate code**.

---

## 1. Tech Stack (Fixed)

- **React + TypeScript** (TypeScript is mandatory, strict mode assumed)
- `any` type is **strictly forbidden**
  - Use `unknown`, generics, or explicit types instead
- State management
  - **Server state**: TanStack Query (React Query)
  - **UI / local state**: `useState` or `useReducer`
- Routing: React Router
- Styling: **Single styling solution only** (e.g. Tailwind CSS)

---

## 2. Project Structure (Strict)

All files must follow this structure:

src/
 ├─ pages/          # Route-level components (composition only)
 ├─ features/       # Domain-based logic (auth, posts, comments, etc.)
 ├─ components/     # Reusable UI components
 ├─ api/            # API clients and endpoint functions
 ├─ hooks/          # Shared hooks (queries, mutations, side effects)
 ├─ types/          # Global/shared TypeScript types
 ├─ utils/          # Pure utility functions
 ├─ constants/      # Constant values

### Structural Principles

- **Pages = composition only**
  - No business logic
  - No direct API calls
- **Features = domain logic**
- **Side effects live in hooks**
- **API communication lives in `api/` only**

### Naming & Size Rules

- Components / Types: PascalCase
- Functions / Variables: camelCase
- File names: use **one consistent format only**
- A single file should not exceed **~300 lines**
- A single function should not exceed **~30 lines**
  - Split aggressively when responsibilities grow

---

## 3. API Integration Rules

- **UI components and pages must NEVER call APIs directly**
- All API calls must be implemented inside `api/*.ts`
- Axios must be wrapped in a shared instance

### Backend Response Typing

If the backend provides a standardized response format, model it explicitly.
If not, adapt to the actual format and document it with types.

Example:

interface ApiResponse<T> {
  status: 'SUCCESS' | 'FAIL' | 'ERROR'
  message: string
  data: T
}

---

## 4. Authentication & Token Handling

- Access tokens must be sent via the Authorization header:
  Authorization: Bearer <access_token>

- If a request returns **401**:
  1. Attempt refresh token **exactly once**
  2. Retry the original request
  3. If refresh fails → force logout

- **Concurrent refresh requests must be deduplicated**
  - Only one refresh request may be in-flight at a time

---

## 5. React Query Rules

- All server data must use **TanStack Query**
- Do not fetch server data inside useEffect
- Query key conventions:
  - ['posts']
  - ['posts', postId]
  - ['comments', postId]
- Mutations must invalidate or refetch related queries

---

## 6. UI Component Rules

- Prefer building **reusable core components** when needed:
  - Button
  - Input
  - Modal
  - Toast
  - Spinner
  - Skeleton
- Use semantic HTML elements
- Accessibility considerations are required

---

## 7. Loading / Error / Empty States

Every API-driven screen **must explicitly handle**:

- Loading state
- Error state
- Empty state

---

## 8. Forms & Validation

- Use **React Hook Form**
- Schema validation with **Zod**
- Prevent duplicate submissions
- Validation logic must not live inside UI components

---

## 9. Code Quality Rules

- Follow ESLint & Prettier conventions
- Prefer explicit typing over inference when ambiguous
- Comments should explain **WHY**, not **WHAT**
- Avoid meaningless or redundant comments

---

## 10. Environment & Security

- Use environment variables only
- Do not hardcode secrets or credentials
- Do not leak sensitive values into logs or UI

---

## 11. Required Output Set

For every feature implementation, the output must include:

1. Types
2. API functions
3. Hooks
4. UI components
5. State handling logic

---

## 12. Guiding Principles

- Pages handle **composition only**
- Business logic lives in **features**
- Side effects live in **hooks**
- API communication is isolated
- Maintain clear separation of concerns

---

## 13. Violation Policy (Critical)

If any requested task would violate these rules:

- **Do NOT generate code**
- Explain which rule conflicts and why
- Propose **at least two viable alternatives**

If requirements are ambiguous:

- Ask clarifying questions **before** generating code
