# Stage 1: Build C++ Engine
FROM gcc:12 AS cpp-builder
WORKDIR /usr/src/nexus-core
# Copy source
COPY nexus-core/ .
# Build static binary if possible, or standard
RUN g++ -std=c++20 -o nexus_core src/main.cpp

# Stage 2: Build Java Backend
FROM maven:3.9-eclipse-temurin-17 AS java-builder
WORKDIR /app
# Copy pom.xml and source
# Note: We assume build context is project root
COPY backend/pom.xml .
COPY backend/src ./src
# Build
RUN mvn clean package -DskipTests

# Stage 3: Runtime
FROM eclipse-temurin:17-jre-jammy
WORKDIR /app

# Copy C++ binary
COPY --from=cpp-builder /usr/src/nexus-core/nexus_core /app/nexus_core
# Copy Java Jar
COPY --from=java-builder /app/target/nexus-api-0.0.1-SNAPSHOT.jar /app/app.jar
# Install libstdc++ if needed (usually included in jammy, but let's ensure)
# RUN apt-get update && apt-get install -y libstdc++6

# Set env for engine path (can be overridden)
ENV NEXUS_ENGINE_PATH=/app/nexus_core

EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
