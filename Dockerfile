FROM openjdk:21-jdk-slim AS build

WORKDIR /app

COPY . .

RUN apt-get update && apt-get install -y findutils xargs && rm -rf /var/lib/apt/lists/*

RUN chmod +x ./gradlew

RUN ./gradlew clean build --no-daemon --stacktrace --info

FROM eclipse-temurin:21-jre

WORKDIR /app

COPY --from=build /app/build/libs/czerny1728.github.io-1.0.jar ./app.jar

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]
