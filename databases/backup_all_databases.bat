@echo off
echo ========================================
echo  Supermarket Database Backup Script
echo ========================================
echo.

REM Create backups folder if it doesn't exist
if not exist "backups" mkdir backups

REM Get current date in YYYYMMDD format
set BACKUP_DATE=%date:~-4,4%%date:~-10,2%%date:~-7,2%

echo Starting database backups...
echo Backup date: %BACKUP_DATE%
echo.

echo [1/5] Backing up supermarket_products_db...
mysqldump -u root -p1234 supermarket_products_db > backups\supermarket_products_db_%BACKUP_DATE%.sql
if %errorlevel% equ 0 (echo SUCCESS) else (echo FAILED)

echo [2/5] Backing up supermarket_inventory_db...
mysqldump -u root -p1234 supermarket_inventory_db > backups\supermarket_inventory_db_%BACKUP_DATE%.sql
if %errorlevel% equ 0 (echo SUCCESS) else (echo FAILED)

echo [3/5] Backing up supermarket_order_db...
mysqldump -u root -p1234 supermarket_order_db > backups\supermarket_order_db_%BACKUP_DATE%.sql
if %errorlevel% equ 0 (echo SUCCESS) else (echo FAILED)

echo [4/5] Backing up supermarket_users_db...
mysqldump -u root -p1234 supermarket_users_db > backups\supermarket_users_db_%BACKUP_DATE%.sql
if %errorlevel% equ 0 (echo SUCCESS) else (echo FAILED)

echo [5/5] Backing up supermarket_payment_db...
mysqldump -u root -p1234 supermarket_payment_db > backups\supermarket_payment_db_%BACKUP_DATE%.sql
if %errorlevel% equ 0 (echo SUCCESS) else (echo FAILED)

echo.
echo ========================================
echo  Backup Complete!
echo ========================================
echo.
echo Backup files saved in: backups\
dir /B backups\*%BACKUP_DATE%.sql
echo.
pause
