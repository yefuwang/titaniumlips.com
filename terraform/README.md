# Titaniumlips Infrastructure

This folder contains the OpenTofu configuration for `titaniumlips.com`.

## Spacelift Variables

Set these on the `titaniumlips` Spacelift stack:

- `CLOUDFLARE_API_TOKEN` as a secret environment variable
- `TF_VAR_cloudflare_account_id`
- `TF_VAR_cloudflare_zone_id`

The Cloudflare API token also needs permission to manage Email Routing for the
zone and account destination addresses.

## Managed Resources

- Cloudflare Pages project: `titaniumlips`
- Custom domains: `titaniumlips.com`, `www.titaniumlips.com`
- DNS records pointing both hostnames to the Pages project
- Cloudflare Email Routing DNS setup
- Email Routing destination address: `yefuwang@gmail.com`
- Email Routing catch-all forwarding for `*@titaniumlips.com`
