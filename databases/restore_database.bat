@echo off
echo ========================================
echo  Supermarket Database Restore Script
echo ========================================
echo.

echo Available backup files:
echo.
dir /B backups\*.sql
echo.

set /p BACKUP_FILE="Enter the backup filename to restore (e.g., supermarket_products_db_20251222.sql): "

if not exist "backups\%BACKUP_FILE%" (
    echo ERROR: File not found!
    pause
    exit /b
)

REM Extract database name from filename
for /f "tokens=1,2 delims=_" %%a in ("%BACKUP_FILE%") do set DB_NAME=%%a_%%b_db

echo.
echo WARNING: This will restore %DB_NAME% from backup!
echo Current data will be REPLACED!
echo.
set /p CONFIRM="Are you sure? (yes/no): "

if /i not "%CONFIRM%"=="yes" (
    echo Restore cancelled.
    pause
    exit /b
)

echo.
echo Restoring %DB_NAME% from %BACKUP_FILE%...
mysql -u root -p1234 %DB_NAME% < backups\%BACKUP_FILE%

if %errorlevel% equ 0 (
    echo.
    echo ========================================
    echo  Restore Complete!
    echo ========================================
) else (
    echo.
    echo ========================================
    echo  Restore FAILED!
    echo ========================================
)

echo.
pause
