@echo off
SETLOCAL ENABLEEXTENSIONS

REM ============================
REM Angular 17 Migration using portable Node
REM ============================

REM Avoid Windows user profile issues
set USERPROFILE=C:\node-fake-home
set HOMEPATH=\node-fake-home
set HOME=C:\node-fake-home
set TEMP=C:\node-fake-home\tmp
set TMP=C:\node-fake-home\tmp
set NODE_OPTIONS=--openssl-legacy-provider

REM Set local Node path (relative to this script)
set "NODE_DIR=%CD%\node-v22.2.0-win-x64"
set PATH=%NODE_DIR%;%PATH%

REM Ensure temp folder exists
if not exist C:\node-fake-home\tmp mkdir C:\node-fake-home\tmp

echo ====================================================
echo 🔧 Starting Angular 17 Migration (Safe Version)...
echo ====================================================

REM Step 1: Install dependencies (with legacy peer deps)
echo 📦 Running npm install (legacy peer deps)...
%NODE_DIR%\node.exe %NODE_DIR%\node_modules\npm\bin\npm-cli.js install --legacy-peer-deps
IF %ERRORLEVEL% NEQ 0 (
  echo ❌ npm install failed!
  pause
  exit /b %ERRORLEVEL%
)

echo ✅ npm install complete.
echo.
pause

REM Step 2: Upgrade Angular CLI & Core
echo 🚀 Updating to Angular 17...
%NODE_DIR%\node.exe %NODE_DIR%\node_modules\npm\bin\npm-cli.js exec ng update @angular/core@17 @angular/cli@17 --force
IF %ERRORLEVEL% NEQ 0 (
  echo ❌ Angular update failed!
  pause
  exit /b %ERRORLEVEL%
)

echo ✅ Angular updated.
echo.
pause

REM Step 3: Check Angular version
echo 🔍 Final Angular version:
%NODE_DIR%\node.exe %NODE_DIR%\node_modules\npm\bin\npm-cli.js exec ng version

echo.
echo ✅ Migration to Angular 17 successful!
pause
