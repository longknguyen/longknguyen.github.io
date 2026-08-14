FROM eclipse-temurin:21-jdk AS build

WORKDIR /app

COPY . .

RUN apt-get update && apt-get install -y curl findutils gnupg && rm -rf /var/lib/apt/lists/*

RUN curl -fsSL https://deb.nodesource.com/setup_22.x | bash -
RUN apt-get update && apt-get install -y nodejs && rm -rf /var/lib/apt/lists/*

RUN chmod +x ./gradlew

RUN npm --prefix frontend ci

RUN ./gradlew clean build --no-daemon

FROM eclipse-temurin:21-jre

WORKDIR /app

COPY --from=build /app/build/libs/app.jar ./app.jar

EXPOSE 8080

USER 10001:10001

ENTRYPOINT ["java", "-jar", "app.jar"]
