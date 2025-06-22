FROM eclipse-temurin:21
WORKDIR /app
COPY . .
RUN ./gradlew build
RUN cp build/libs/*SNAPSHOT.jar app.jar
EXPOSE 8080
CMD ["java", "-jar", "app.jar"]