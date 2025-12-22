@echo off
echo ========================================
echo  FreshMart Database Setup
echo  Clean Installation with Sample Data
echo ========================================
echo.

echo This will:
echo  - Clear existing data in all databases
echo  - Install 50 fresh products
echo  - Setup inventory for all products
echo  - Create 5 admin users
echo.

set /p CONFIRM="Continue? (yes/no): "
if /i not "%CONFIRM%"=="yes" (
    echo Setup cancelled.
    pause
    exit /b
)

echo.
echo Running database setup script...
echo.

mysql -u root -p1234 < populate_sample_data.sql

if %errorlevel% equ 0 (
    echo.
    echo ========================================
    echo  SUCCESS! Database Setup Complete!
    echo ========================================
    echo.
    echo Created:
    echo  - 50 Products (Vegetables, Fruits, Dairy, Bakery, Beverages, Snacks)
    echo  - 50 Inventory Records
    echo  - 5 Admin Users
    echo.
    echo Admin Login Credentials:
    echo  1. admin / admin123
    echo  2. manager / manager123
    echo  3. supervisor / super123
    echo  4. cashier1 / cash123
    echo  5. inventory_admin / inv123
    echo.
    echo Next Steps:
    echo  1. Start all microservices
    echo  2. Login to frontend
    echo  3. Check Products, Inventory pages
    echo.
) else (
    echo.
    echo ========================================
    echo  ERROR! Setup Failed!
    echo ========================================
    echo.
    echo Possible issues:
    echo  - MySQL not running
    echo  - Wrong password (currently: 1234)
    echo  - Databases not created yet
    echo.
    echo TIP: Start each microservice once to auto-create databases
    echo.
)

pause
