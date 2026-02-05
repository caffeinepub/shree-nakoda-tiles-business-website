# Specification

## Summary
**Goal:** Let admins upload/replace a single PDF brochure/catalog via the Admin Dashboard, while hiding login/logout controls from the public site UI.

**Planned changes:**
- Backend: store a single uploaded PDF using the existing external blob storage pattern; add admin-only API to upload/replace the PDF and a public API to fetch the current PDF (or null).
- Frontend: add React Query hooks for fetching the current PDF and uploading/replacing it (with toasts and query invalidation).
- Frontend: add a new Admin Dashboard “PDF” tab with a PDF-only file picker, upload action, and status display with an open/download link when a PDF exists.
- Frontend: remove login/logout UI from public pages (Home/Products/Contact); keep authentication controls only on the Admin page.

**User-visible outcome:** Visitors can browse the public site without seeing any login/logout controls, and admins can log in on the Admin page to upload/replace a PDF and open/download the currently uploaded document.
