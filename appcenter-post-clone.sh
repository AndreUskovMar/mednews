#!/usr/bin/env bash

echo "Creating the .env file"
cat > ./.env <<EOL
API_URL=${API_URL}
DC_CLIENT_ID=${DC_CLIENT_ID}
DC_SECRET=${DC_SECRET}
STRAPI_URL=${STRAPI_URL}
STRAPI_API_TOKEN=${STRAPI_API_TOKEN}
IMPRESSUM_URL=${IMPRESSUM_URL}
DATENSCHUTZ_URL=${DATENSCHUTZ_URL}
POSTER_URL=${POSTER_URL}
APPLE_STORE_APP_URL=${APPLE_STORE_APP_URL}
GOOGLE_PLAY_APP_URL=${GOOGLE_PLAY_APP_URL}
PIWIK_SERVER_ADDRESS=${PIWIK_SERVER_ADDRESS}
PIWIK_WEBSITE_ID=${PIWIK_WEBSITE_ID}
EOL

if [ "$APPCENTER_BRANCH" == "main" ]
then
  echo "Switching to Firebase production environment"
  cp -rf ./firebase_environments/production/google-services.json ./android/app
  cp -rf ./firebase_environments/production/GoogleService-Info.plist ./ios
elif [ "$APPCENTER_BRANCH" == "develop" ]
then
  echo "Switching to Firebase dev environment"
  cp -rf ./firebase_environments/develop/google-services.json ./android/app
  cp -rf ./firebase_environments/develop/GoogleService-Info.plist ./ios
else
  echo "Did not found ${APPCENTER_BRANCH}"
fi

POD_RAMDISK=$(hdid -nomount ram://6291456) #3GB
newfs_hfs -v Pods $POD_RAMDISK
mkdir -p $APPCENTER_SOURCE_DIRECTORY/ios/Pods || true
diskutil mount -mountPoint $APPCENTER_SOURCE_DIRECTORY/ios/Pods $POD_RAMDISK

NODE_MODULE_RAMDISK=$(hdid -nomount ram://4194304) #2GB
newfs_hfs -v NodeModules $NODE_MODULE_RAMDISK
mkdir -p $APPCENTER_SOURCE_DIRECTORY/node_modules || true
diskutil mount -mountPoint $APPCENTER_SOURCE_DIRECTORY/node_modules $NODE_MODULE_RAMDISK