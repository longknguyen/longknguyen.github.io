# Email templates

The source email templates live in this directory as React and TypeScript components.
Do not edit the HTML files under `src/main/resources/email-templates` directly; they are generated artifacts used by the Spring backend.

Run `npm run build` from `frontend` to:

1. Bundle the TSX email components.
2. Render them to static HTML with placeholder tokens.
3. Write the generated templates to `src/main/resources/email-templates`.
4. Build the portfolio frontend.

Email clients require conservative HTML, table layouts, and inline styles. The TSX components provide the maintainable authoring layer while the build step produces the compatible HTML that Resend sends.
