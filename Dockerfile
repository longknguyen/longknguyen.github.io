FROM gradle:7.6.1-jdk21 AS build

WORKDIR /app

COPY . .

# Build the JAR
RUN chmod +x ./gradlew
RUN ./gradlew clean build --no-daemon --stacktrace --info

FROM eclipse-temurin:17-jre

WORKDIR /app

COPY --from=build /app/build/libs/czerny1728.github.io-1.0.jar ./app.jar

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]
