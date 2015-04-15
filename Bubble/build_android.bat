@echo off
CLS

title Atmosphere PhoneGap Android Builder for Windows
color 1f

echo --------------------------------------------------------------
echo     Welcome to Atmosphere PhoneGap Android for Windows
echo.
echo  Before running this make sure that you have installed the 
echo  necessary requirements for building a phonegap/android 
echo  application in your windows environment.
echo. 
echo  For more information visit atmosphere.anaren.com/wiki
echo.
echo --------------------------------------------------------------
echo.

:: Delete variable %O%
SET "O="
set /P "O= Enter (q) to quit OR any key to continue... "

IF /I "%O%"=="Q" GOTO quit

GOTO install


:install
echo INSTALLING...

REM cordova platform add android & cordova build & cordova plugin add org.apache.cordova.console & cordova plugin add org.apache.cordova.device & cordova plugin add org.apache.cordova.inappbrowser & cordova plugin add https://github.com/kgillespieanaren/BluetoothLE.git & cordova run android -d

phonegap platform add android
phonegap build
phonegap plugin add org.apache.cordova.console 
phonegap plugin add org.apache.cordova.device
phonegap plugin add org.apache.cordova.inappbrowser
phonegap plugin add https://github.com/kgillespieanaren/BluetoothLE.git
phonegap run android -d

color 0f


:quit
echo Android Build Cancelled
color 0f

