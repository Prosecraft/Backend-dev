-- Create database if it doesn't exist
SELECT 'CREATE DATABASE prosecraft_project'
WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'prosecraft_project')\gexec

-- Create user if it doesn't exist
DO $$
BEGIN
    IF NOT EXISTS (SELECT FROM pg_user WHERE usename = 'gadielmenz') THEN
        CREATE USER gadielmenz WITH PASSWORD 'group52';
    END IF;
END
$$;

-- Grant privileges
GRANT ALL PRIVILEGES ON DATABASE prosecraft_project TO gadielmenz;
GRANT ALL ON SCHEMA public TO gadielmenz;
ALTER USER gadielmenz CREATEDB; 