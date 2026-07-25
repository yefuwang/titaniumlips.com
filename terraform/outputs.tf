output "cloudflare_pages_project_name" {
  description = "Cloudflare Pages project name."
  value       = cloudflare_pages_project.website.name
}

output "cloudflare_pages_subdomain" {
  description = "Cloudflare Pages project subdomain."
  value       = cloudflare_pages_project.website.subdomain
}

output "website_url" {
  description = "Primary website URL."
  value       = "https://${var.domain_name}"
}

output "www_url" {
  description = "WWW website URL."
  value       = "https://www.${var.domain_name}"
}
