#!/bin/bash

# =================================================================
# 🚀 KINETIC ARCHITECT — FRONTEND ONLY DEPLOY SCRIPT (v3.0)
# =================================================================

# 1. Configuration
USER="alaminrobin"
SERVER="147.93.94.96"
FRONTEND_DIR="/home/alaminrobin/public_html"

# FAIL FAST
set -e

echo "----------------------------------------------------"
echo "🛠️  Building Frontend Assets (v3.0.0)..."
echo "----------------------------------------------------"
rm -rf dist
npm run build

echo "----------------------------------------------------"
echo "📦 Creating Bundle..."
echo "----------------------------------------------------"
tar -czf frontend_bundle.tar.gz -C dist .

echo "----------------------------------------------------"
echo "📡 Deploying to alaminrobin.com..."
echo "----------------------------------------------------"

# Send and Execute
cat frontend_bundle.tar.gz | ssh $USER@$SERVER "bash -l -c '
  set -e
  echo \"🚚 Pure Frontend Extraction...\"
  mkdir -p .deploy_temp_fe
  tar -xzf - -C .deploy_temp_fe
  
  echo \"🚚 Distributing Web Root...\"
  cp -rf .deploy_temp_fe/* $FRONTEND_DIR/
  
  echo \"🧹 Deep Sanitization (Removing Backend)...\"
  rm -rf /home/alaminrobin/api-server
  rm -rf /home/alaminrobin/api.alaminrobin.com
  rm -f $FRONTEND_DIR/contact.php
  
  echo \"🧹 Local Cleanup...\"
  rm -rf .deploy_temp_fe
'"

# Local Cleanup
rm frontend_bundle.tar.gz

echo "----------------------------------------------------"
echo "✅ FRONTEND DEPLOYMENT COMPLETE!"
echo "📍 Domain: https://alaminrobin.com"
echo "----------------------------------------------------"


