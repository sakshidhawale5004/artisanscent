<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

## Application architecture
- Keep shareable content in individual TanStack leaf routes with route-specific metadata; shared navigation and enquiry state live in SiteShell to remain consistent across pages.
- Store uploaded media as Lovable Assets pointers, with a local square favicon exception; this keeps the repository lightweight and preserves brand identity.
- Keep product information separate from presentation and use enquiry-only purchasing until payment and order services are explicitly connected; this avoids pretending an enquiry is a paid order.
- Load React Three Fiber artwork lazily after browser mounting and derive its material colors from global design tokens; this keeps server rendering safe and visual roles consistent.
- Policy text remains visibly marked as draft until the business provides and approves final terms; unverified commercial terms must not be invented.

- Keep uploaded collection families distinct from additional fragrance categories and store car fragrances in their own product group; this prevents car products appearing in the Artisan Scent filter.
