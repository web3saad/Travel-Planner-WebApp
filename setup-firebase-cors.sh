#!/bin/bash

# ===============================
#  Firebase Storage CORS Setup
#  Professional Script
# ===============================

# --- Color Codes ---
RED="\033[0;31m"
GREEN="\033[0;32m"
YELLOW="\033[1;33m"
CYAN="\033[0;36m"
BOLD="\033[1m"
RESET="\033[0m"

# --- Helper Functions ---
function info()    { echo -e "${CYAN}${BOLD}[INFO]${RESET} $1"; }
function success() { echo -e "${GREEN}${BOLD}[SUCCESS]${RESET} $1"; }
function warn()    { echo -e "${YELLOW}${BOLD}[WARN]${RESET} $1"; }
function error()   { echo -e "${RED}${BOLD}[ERROR]${RESET} $1"; }

# --- Check gsutil ---
info "Checking for gsutil (Google Cloud CLI)..."
if ! command -v gsutil &> /dev/null; then
    error "gsutil is not installed."
    echo "\nTo install, visit: https://cloud.google.com/sdk/docs/install"
    exit 1
fi

# --- Check Authentication ---
info "Checking Google Cloud authentication..."
gsutil ls gs:// &> /dev/null
if [ $? -ne 0 ]; then
    error "You are not authenticated with Google Cloud."
    echo "Run: ${BOLD}gcloud auth login${RESET} and try again."
    exit 1
fi

# --- Get Bucket Name ---
ENV_FILE="./client/.env"
BUCKET_NAME=$(grep VITE_FIREBASE_STORAGE_BUCKET "$ENV_FILE" | cut -d '=' -f2 | tr -d '[:space:]')

if [ -z "$BUCKET_NAME" ]; then
    warn "VITE_FIREBASE_STORAGE_BUCKET not found in $ENV_FILE."
    read -p "Enter your Firebase Storage bucket name (e.g., your-project.appspot.com): " BUCKET_NAME
    if [ -z "$BUCKET_NAME" ]; then
        error "Bucket name cannot be empty. Exiting."
        exit 1
    fi
fi

info "Target bucket: ${BOLD}$BUCKET_NAME${RESET}"

# --- Confirm Action ---
echo
read -p "Apply CORS configuration to this bucket? (y/n): " CONFIRM
if [[ ! "$CONFIRM" =~ ^[Yy]$ ]]; then
    warn "Operation cancelled by user."
    exit 0
fi

echo
info "Applying CORS configuration from ${BOLD}cors.json${RESET}..."
gsutil cors set cors.json gs://$BUCKET_NAME

if [ $? -eq 0 ]; then
    success "CORS configuration successfully applied to $BUCKET_NAME!"
    echo "You can now try uploading images again."
else
    error "Failed to apply CORS configuration."
    echo "Try running: ${BOLD}gsutil cors set cors.json gs://$BUCKET_NAME${RESET} manually."
    echo "Check that cors.json exists and is valid."
fi
