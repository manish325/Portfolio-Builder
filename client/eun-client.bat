@echo off
echo Starting Angular 17 migration setup...

REM Step 1: Clean up old modules
echo Removing old node_modules and package-lock.json...
rmdir /s /q node_modules
del /f /q package-lock.json

REM Step 2: Install dependencies
echo Installing packages...
npm install

REM Step 3: Force Angular CLI and Core update
echo Running Angular update...
npx ng update @angular/core@17 @angular/cli@17 --force

REM Step 4: Confirm version
echo Installed Angular version:
npx ng version

echo.
echo ✅ Migration to Angular 17 completed!
pause
