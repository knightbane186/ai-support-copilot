variable "project_name" {
  type        = string
  description = "Base project name for future Azure resources."
  default     = "ai-support-copilot"
}

variable "location" {
  type        = string
  description = "Target Azure region."
  default     = "Australia Southeast"
}
