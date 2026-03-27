#!/bin/bash

# =================================================================
# 🚀 KINETIC ARCHITECT — SERVER INITIALIZATION (v11.5)
# =================================================================

USER="alaminrobin"
SERVER="147.93.94.96"

echo "----------------------------------------------------"
echo "🛠️  Initializing Server Folders via Terminal..."
echo "----------------------------------------------------"

ssh $USER@$SERVER "bash -l -c '
  set -e
  echo \"📁 Creating Backend folder...\"
  mkdir -p ~/api-server
  
  echo \"📁 Checking Subdomain folder...\"
  # We look for where the subdomain is mapped (standard is the domain name)
  SUBDOMAIN_DIR=\"~/api.alaminrobin.com\"
  mkdir -p \$SUBDOMAIN_DIR
  
  echo \"⚙️  Configuring Apache Bridge (.htaccess)...\"
  cat <<EOF > \$SUBDOMAIN_DIR/.htaccess
# 🛡️ KINETIC ARCHITECT API BRIDGE
PassengerEnabled on
PassengerAppRoot /home/alaminrobin/api-server
PassengerAppType node
PassengerStartupFile app.js
EOF

  echo \"✅ Server Folders Ready!\"
'"

echo "----------------------------------------------------"
echo "🚀 Initialization Complete! Now run: npm run deploy"
echo "----------------------------------------------------"
