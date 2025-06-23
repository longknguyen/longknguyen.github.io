FROM openjdk:21 AS build

WORKDIR /app

COPY . .

RUN chmod +x ./gradlew

RUN ./gradlew clean build --no-daemon --stacktrace --info

# Use runtime JRE for final image
FROM eclipse-temurin:21-jre

WORKDIR /app

COPY --from=build /app/build/libs/czerny1728.github.io-1.0.jar ./app.jar

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]
