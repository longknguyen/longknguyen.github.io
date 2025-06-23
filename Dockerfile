FROM openjdk:21-jdk-slim AS build

WORKDIR /app

COPY . .

RUN apt-get update && apt-get install -y findutils && rm -rf /var/lib/apt/lists/*

RUN chmod +x ./gradlew

RUN ./gradlew clean build --no-daemon --stacktrace --info

# Debug: list files in build/libs to check JAR presence
RUN ls -l build/libs

FROM eclipse-temurin:21-jre

WORKDIR /app

COPY --from=build /app/build/libs/app-1.0.jar ./app.jar

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]
