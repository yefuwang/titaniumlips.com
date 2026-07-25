variable "domain_name" {
  description = "Primary public domain."
  type        = string
  default     = "titaniumlips.com"
}

variable "cloudflare_account_id" {
  description = "Cloudflare account ID."
  type        = string
  sensitive   = true
}

variable "cloudflare_zone_id" {
  description = "Cloudflare zone ID for the primary domain."
  type        = string
  sensitive   = true
}

variable "cloudflare_pages_project_name" {
  description = "Cloudflare Pages project name."
  type        = string
  default     = "titaniumlips"
}

variable "github_owner" {
  description = "GitHub repository owner connected to Cloudflare Pages."
  type        = string
  default     = "yefuwang"
}

variable "github_repository" {
  description = "GitHub repository name connected to Cloudflare Pages."
  type        = string
  default     = "titaniumlips.com"
}
