@echo off
echo Starting Prosecraft Backend Services...
echo.

echo 1. Starting Discovery Service (Eureka Server)...
start "Discovery Service" cmd /k "cd discovery-service && mvn spring-boot:run -Dspring-boot.run.jvmArguments=-Xmx512m"
timeout /t 10 /nobreak > nul

echo 2. Starting Gateway Service...
start "Gateway Service" cmd /k "cd gateway-service && mvn spring-boot:run -Dspring-boot.run.jvmArguments=-Xmx512m"
timeout /t 10 /nobreak > nul

echo 3. Starting Auth Service...
start "Auth Service" cmd /k "cd auth-service && mvn spring-boot:run -Dspring-boot.run.jvmArguments=-Xmx512m"
timeout /t 10 /nobreak > nul

echo 4. Starting Document Service...
start "Document Service" cmd /k "cd document-service && mvn spring-boot:run -Dspring-boot.run.jvmArguments=-Xmx512m"
timeout /t 10 /nobreak > nul

echo 5. Starting Grammar Service...
start "Grammar Service" cmd /k "cd grammar-service && mvn spring-boot:run -Dspring-boot.run.jvmArguments=-Xmx512m"

echo.
echo All services are starting...
echo.
echo Services will be available at:
echo - Eureka Dashboard: http://localhost:8761
echo - API Gateway: http://localhost:8080
echo - Auth Service: http://localhost:8081
echo - Document Service: http://localhost:8082
echo - Grammar Service: http://localhost:8083
echo.
pause 