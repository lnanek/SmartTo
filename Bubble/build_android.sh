#!/bin/sh

./clean.sh

phonegap build android
phonegap plugin add https://github.com/apache/cordova-plugin-console.git
phonegap plugin add https://github.com/apache/cordova-plugin-device.git
phonegap plugin add https://github.com/apache/cordova-plugin-inappbrowser.git
phonegap plugin add https://github.com/randdusing/BluetoothLE.git
#phonegap plugin add https://github.com/kgillespieanaren/BluetoothLE.git

cp android_overlay/project.properties platforms/android/
cp android_overlay/CordovaWebViewClient.java platforms/android/CordovaLib/src/org/apache/cordova/

phonegap install android -d