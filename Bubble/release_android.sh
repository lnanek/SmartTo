#!/bin/sh

rm AnarenAtmosphere-release-unaligned.apk
rm AnarenAtmosphere-release-aligned.apk

./build_android.sh

pushd platforms/android
ant release
popd

cp platforms/android/bin/AnarenAtmosphere-release-unsigned.apk ./AnarenAtmosphere-release-unaligned.apk
zip -d "AnarenAtmosphere-release-unaligned.apk" META-INF/\*
jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore ./$1-release-key.keystore AnarenAtmosphere-release-unaligned.apk alias_name
~/share/android-sdk-linux/build-tools/21.1.1/zipalign -v 4 AnarenAtmosphere-release-unaligned.apk AnarenAtmosphere-release-aligned.apk