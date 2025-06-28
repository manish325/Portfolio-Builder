@echo off
REM Set environment to avoid Windows user folder issues
set USERPROFILE=C:\node-fake-home
set HOMEPATH=\node-fake-home
set HOME=C:\node-fake-home
set NODE_OPTIONS=--openssl-legacy-provider

REM Add local portable Node.js to PATH
set PATH=%CD%\node-v22.2.0-win-x64;%PATH%

REM Run NestJS dev server
.\node-v22.2.0-win-x64\npm.cmd run dev

pause
