# -- General ------------------------------------

variable "gcp_project" {
  type        = string
  description = "The GCP project."
}

variable "gcp_region" {
  type        = string
  description = "The GCP region, which will be used primarily for hosting resources."
  default     = "europe-west6"
}

variable "gcp_cloud_run_region" {
  type        = string
  description = "The GCP region, which will be used to host cloud run resources."
  default     = "europe-west1"
}

variable "domain" {
  description = "The domain under which the services should be accessible."
  type        = string
}

# -- Landing page -----------------------------------------

variable "landing_image" {
  description = "The url of the landing page docker image."
  type        = string
}

variable "landing_cpu_limit" {
  description = "The value of the property is converted to its millicore value and multiplied by 100. The resulting value is the total amount of CPU time that a container can use every 100ms. A container cannot use more than its share of CPU time during this interval."
  type        = string
  default     = "1000m"
}

variable "landing_memory_limit" {
  description = "The maximum amout of memory an instance can use. If a Container exceeds its memory limit, it might be terminated."
  type        = string
  default     = "256Mi"
}

variable "landing_container_concurrency" {
  description = "Container concurrency specifies the maximum allowed in-flight (concurrent) requests per container of the Revision."
  type        = number
  default     = 80
}

variable "landing_min_instances" {
  description = "The minimum number of container instances of the Service to run."
  type        = number
  default     = 0
}

variable "landing_timeout_seconds" {
  description = "Sets the max duration the instance is allowed for responding to a request."
  type        = number
  default     = 300
}

variable "landing_sub_domain" {
  description = "The subdomain below the domain under which the landing page should be accessible."
  type        = string
  default     = ""
}

# -- Landing page - Matomo ----------------------

variable "landing_matomo_site_id" {
  description = "The matomo site ID."
  type        = number
}

variable "landing_matomo_tracker_url" {
  description = "The matomo tracker url."
  type        = string
  default     = "https://analytics.validitylabs.org/matomo.php"
}

variable "landing_matomo_src_url" {
  description = "The url of the matomo tracker script to be injected into the pages."
  type        = string
  default     = "https://analytics.validitylabs.org/matomo.js"
}

# -- Landing page - Auth0 -----------------------

variable "landing_auth0_client_id" {
  description = "The Client ID for your application."
  type        = string
}

# The Client Secret for your application. Required when requesting access tokens.
variable "landing_auth0_client_secret_secret_project" {
  description = "The ID of the project in which the resource belongs."
  type        = string
}

variable "landing_auth0_client_secret_secret_id" {
  description = "The unique id of the secret."
  type        = string
}

variable "landing_auth0_client_secret_secret_version" {
  description = "The version of the secret which should be used."
  type        = string
}

# The secret(s) used to derive an encryption key for the user identity in a session cookie 
# and to sign the transient cookies used by the login callback. 
# Use a single string key or array of keys for an encrypted session cookie.
variable "landing_auth0_secret_secret_project" {
  description = "The ID of the project in which the resource belongs."
  type        = string
}

variable "landing_auth0_secret_secret_id" {
  description = "The unique id of the secret."
  type        = string
}

variable "landing_auth0_secret_secret_version" {
  description = "The version of the secret which should be used."
  type        = string
}

variable "landing_auth0_issuer_base_url" {
  description = "The root URL for the token issuer with no trailing slash. This is https:// plus your Auth0 domain."
  type        = string
}
