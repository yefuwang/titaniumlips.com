resource "cloudflare_pages_project" "website" {
  account_id        = var.cloudflare_account_id
  name              = var.cloudflare_pages_project_name
  production_branch = "main"

  build_config = {
    build_caching   = true
    build_command   = "npm run build"
    destination_dir = "dist"
    root_dir        = "site"
  }

  source = {
    type = "github"
    config = {
      owner                          = var.github_owner
      repo_name                      = var.github_repository
      production_branch              = "main"
      production_deployments_enabled = true
      preview_deployment_setting     = "none"
      pr_comments_enabled            = false
      path_includes                  = ["site/*"]
    }
  }
}

resource "cloudflare_pages_domain" "apex" {
  account_id   = var.cloudflare_account_id
  project_name = cloudflare_pages_project.website.name
  name         = var.domain_name
}

resource "cloudflare_pages_domain" "www" {
  account_id   = var.cloudflare_account_id
  project_name = cloudflare_pages_project.website.name
  name         = "www.${var.domain_name}"
}

resource "cloudflare_dns_record" "apex" {
  zone_id = var.cloudflare_zone_id
  name    = var.domain_name
  type    = "CNAME"
  content = cloudflare_pages_project.website.subdomain
  ttl     = 1
  proxied = true

  comment = "Managed by OpenTofu for Cloudflare Pages."

  depends_on = [cloudflare_pages_domain.apex]
}

resource "cloudflare_dns_record" "www" {
  zone_id = var.cloudflare_zone_id
  name    = "www.${var.domain_name}"
  type    = "CNAME"
  content = cloudflare_pages_project.website.subdomain
  ttl     = 1
  proxied = true

  comment = "Managed by OpenTofu for Cloudflare Pages."

  depends_on = [cloudflare_pages_domain.www]
}

resource "cloudflare_email_routing_dns" "primary" {
  zone_id = var.cloudflare_zone_id
  name    = var.domain_name
}

resource "cloudflare_email_routing_address" "forward_destination" {
  account_id = var.cloudflare_account_id
  email      = var.email_forward_destination
}

resource "cloudflare_email_routing_catch_all" "primary" {
  zone_id = var.cloudflare_zone_id
  name    = "Forward all ${var.domain_name} email to ${var.email_forward_destination}"
  enabled = true

  actions = [{
    type  = "forward"
    value = [var.email_forward_destination]
  }]

  matchers = [{
    type = "all"
  }]

  depends_on = [
    cloudflare_email_routing_address.forward_destination,
    cloudflare_email_routing_dns.primary,
  ]
}
