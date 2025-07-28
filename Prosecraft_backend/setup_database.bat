@echo off
echo Setting up PostgreSQL database for Prosecraft...
echo.

echo Creating database and user...
echo You may be prompted for the PostgreSQL password.

set PGPASSWORD=your_postgres_password_here

REM Try to create database and user
psql -U postgres -c "CREATE DATABASE prosecraft_project;" 2>nul
if %errorlevel% neq 0 (
    echo Database prosecraft_project already exists or creation failed.
)

psql -U postgres -c "CREATE USER gadielmenz WITH PASSWORD 'group52';" 2>nul
if %errorlevel% neq 0 (
    echo User gadielmenz already exists or creation failed.
)

psql -U postgres -c "GRANT ALL PRIVILEGES ON DATABASE prosecraft_project TO gadielmenz;" 2>nul
psql -U postgres -c "GRANT ALL ON SCHEMA public TO gadielmenz;" 2>nul
psql -U postgres -c "ALTER USER gadielmenz CREATEDB;" 2>nul

echo.
echo Database setup completed!
echo.
echo If you encountered errors, please:
echo 1. Make sure PostgreSQL is running
echo 2. Update the PGPASSWORD variable in this script with your actual PostgreSQL password
echo 3. Run this script again
echo.
pause 