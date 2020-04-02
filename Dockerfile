FROM maven:3-jdk-8 as builder
COPY . /tmp/app
WORKDIR /tmp/app
RUN mvn package -pl backend -am -DskipTests

FROM adoptopenjdk/openjdk8-openj9:alpine-jre
VOLUME /tmp
COPY --from=builder /tmp/app/backend/target/backend*.jar backend.jar
CMD ["java","-Xmx512m","-Djava.security.egd=file:/dev/./urandom","-jar","backend.jar"]
