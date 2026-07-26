# Titaniumlips Studio

Website for Titaniumlips Studio.

## Structure

- `site/` - static website source deployed by Cloudflare Pages.
- `terraform/` - OpenTofu infrastructure for Cloudflare Pages, custom domains, and DNS.
- `.spacelift/config.yml` - Spacelift runtime configuration for the `titaniumlips` stack.

## Local Spacelift Credentials

Store the shared Spacelift API credentials in macOS Keychain:

- `codex.spacelift.api_key_endpoint`
- `codex.spacelift.api_key_id`
- `codex.spacelift.api_key_secret`

Use `.env.local.example` as the shape for the gitignored `.env.local`; it reads those values from Keychain and sets the project-specific `SPACELIFT_STACK_ID`.
