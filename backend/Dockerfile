# Używamy obrazu Maven z JDK 13 do budowania i uruchamiania aplikacji
FROM maven:3.6.3-jdk-13 AS build
WORKDIR /app
COPY ../spring-boot-ecommerce/pom.xml .
COPY ../spring-boot-ecommerce/src ./src
RUN mvn clean package -DskipTests

FROM adoptopenjdk:13-jre-hotspot
WORKDIR /app
COPY --from=build /app/target/*.jar app.jar

EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
