# Etap budowania – używamy obrazu Maven z JDK 13 (rozważ użycie wersji LTS, np. JDK 11)
FROM maven:3.6.3-jdk-13 AS build
WORKDIR /app
# Kopiujemy jedynie niezbędne pliki, aby zoptymalizować cache warstw
COPY spring-boot-ecommerce/pom.xml .
COPY spring-boot-ecommerce/src ./src
RUN mvn clean package -DskipTests

# Etap uruchomieniowy – używamy lżejszego obrazu JRE
FROM adoptopenjdk:13-jre-hotspot
WORKDIR /app
# Opcjonalnie: utwórz użytkownika nieuprzywilejowanego
RUN adduser --disabled-password appuser
USER appuser
COPY --from=build /app/target/*.jar app.jar

EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
