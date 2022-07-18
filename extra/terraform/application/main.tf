terraform {
  required_version = "~>1.1.0"

  backend "gcs" {}

  required_providers {
    # https://registry.terraform.io/providers/hashicorp/google/latest
    google = {
      source  = "hashicorp/google"
      version = "3.71.0"
    }

    # https://registry.terraform.io/providers/hashicorp/google-beta/latest
    google-beta = {
      source  = "hashicorp/google-beta"
      version = "3.71.0"
    }
  }
}

provider "google" {
  project = var.gcp_project
  region  = var.gcp_region
}

provider "google-beta" {
  project = var.gcp_project
  region  = var.gcp_region
}

# Random Generator
resource "random_string" "suffix" {
  length  = 4
  special = false
  upper   = false
}

locals {
  landing_domain = "${trimspace(var.landing_sub_domain)}${trimspace(var.landing_sub_domain) != "" ? "." : ""}${var.domain}"
}

# -- IAM ----------------------------------------

data "google_iam_policy" "noauth" {
  binding {
    role = "roles/run.invoker"
    members = [
      "allUsers"
    ]
  }
}

# -- Landing page -----------------------------------------

resource "google_service_account" "cloud_run_landing" {
  project      = var.gcp_project
  account_id   = "cloud-run-landing"
  display_name = "Cloud Run LANDING"
}

resource "google_project_iam_member" "cloud_run_landing_logging_log_writer" {
  project = var.gcp_project
  role    = "roles/logging.logWriter"
  member  = "serviceAccount:${google_service_account.cloud_run_landing.email}"
}

resource "google_cloud_run_service" "landing" {
  name     = "landing-${random_string.suffix.result}"
  project  = var.gcp_project
  location = var.gcp_cloud_run_region

  template {
    spec {
      containers {
        image = var.landing_image

        # env {
        #   name  = "NEXT_PUBLIC_BASE_DOMAIN"
        #   value = "https://${local.landing_domain}"
        # }

        resources {
          limits = {
            cpu    = var.landing_cpu_limit
            memory = var.landing_memory_limit
          }
        }
      }

      container_concurrency = var.landing_container_concurrency
      timeout_seconds       = var.landing_timeout_seconds
    }

    metadata {
      annotations = {
        "autoscaling.knative.dev/minScale"      = tostring(var.landing_min_instances)
      }
    }
  }
}

resource "google_cloud_run_service_iam_policy" "landing" {
  location = google_cloud_run_service.landing.location
  project  = google_cloud_run_service.landing.project
  service  = google_cloud_run_service.landing.name

  policy_data = data.google_iam_policy.noauth.policy_data
}

resource "google_cloud_run_domain_mapping" "landing" {
  location = google_cloud_run_service.landing.location
  name     = local.landing_domain

  metadata {
    namespace = var.gcp_project
  }

  spec {
    route_name = google_cloud_run_service.landing.name
  }
}
