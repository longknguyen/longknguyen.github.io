FROM openjdk:17-jdk-alpine

WORKDIR /app

COPY build/libs/czerny1728.github.io-1.0.jar app.jar

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]
