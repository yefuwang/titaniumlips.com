# Titaniumlips Infrastructure

This folder contains the OpenTofu configuration for `titaniumlips.com`.

## Spacelift Variables

Set these on the `titaniumlips` Spacelift stack:

- `CLOUDFLARE_API_TOKEN` as a secret environment variable
- `TF_VAR_cloudflare_account_id`
- `TF_VAR_cloudflare_zone_id`

## Managed Resources

- Cloudflare Pages project: `titaniumlips`
- Custom domains: `titaniumlips.com`, `www.titaniumlips.com`
- DNS records pointing both hostnames to the Pages project
