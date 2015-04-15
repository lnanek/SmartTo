#!/bin/sh

./clean.sh

phonegap build ios
phonegap plugin add https://github.com/apache/cordova-plugin-console.git
phonegap plugin add https://github.com/apache/cordova-plugin-device.git
phonegap plugin add https://github.com/apache/cordova-plugin-inappbrowser.git
phonegap plugin add https://github.com/kgillespieanaren/BluetoothLE.git

cp www/res/icon/ios/icon* platforms/ios/Anaren\ Atmosphere/Resources/icons/
cp www/res/screen/ios/Default* platforms/ios/Anaren\ Atmosphere/Resources/splash/

patch -d platforms/ios/Anaren\ Atmosphere/Classes/ < AppDelegate.m.patch

python ios_fix_info.py
