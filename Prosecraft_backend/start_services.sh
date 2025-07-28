#!/bin/bash

echo "Starting Prosecraft Backend Services..."
echo

echo "1. Starting Discovery Service (Eureka Server)..."
cd discovery-service && mvn spring-boot:run -Dspring-boot.run.jvmArguments="-Xmx512m" &
DISCOVERY_PID=$!
sleep 10

echo "2. Starting Gateway Service..."
cd ../gateway-service && mvn spring-boot:run -Dspring-boot.run.jvmArguments="-Xmx512m" &
GATEWAY_PID=$!
sleep 10

echo "3. Starting Auth Service..."
cd ../auth-service && mvn spring-boot:run -Dspring-boot.run.jvmArguments="-Xmx512m" &
AUTH_PID=$!
sleep 10

echo "4. Starting Document Service..."
cd ../document-service && mvn spring-boot:run -Dspring-boot.run.jvmArguments="-Xmx512m" &
DOCUMENT_PID=$!
sleep 10

echo "5. Starting Grammar Service..."
cd ../grammar-service && mvn spring-boot:run -Dspring-boot.run.jvmArguments="-Xmx512m" &
GRAMMAR_PID=$!

echo
echo "All services are starting..."
echo
echo "Services will be available at:"
echo "- Eureka Dashboard: http://localhost:8761"
echo "- API Gateway: http://localhost:8080"
echo "- Auth Service: http://localhost:8081"
echo "- Document Service: http://localhost:8082"
echo "- Grammar Service: http://localhost:8083"
echo
echo "Press Ctrl+C to stop all services"
echo

# Wait for all background processes
wait 