FROM maven:3-jdk-8 as builder
COPY . /tmp/build
WORKDIR /tmp/build
RUN mvn package -DskipTests
RUN unzip /tmp/build/tosca-lightning-web/target/tosca-lightning-web-*.war -d /tmp/ROOT
RUN cp -a /tmp/build/tosca-lightning-app/build/* /tmp/ROOT/WEB-INF/classes/static

FROM tomcat:9-jdk8
RUN rm /dev/random && ln -s /dev/urandom /dev/random && rm -rf ${CATALINA_HOME}/webapps/*
COPY --from=builder /tmp/ROOT ${CATALINA_HOME}/webapps/ROOT
RUN export CATALINA_OPTS="-Djava.security.egd=file:/dev/./urandom -Xms512m -Xmx2048m -XX:MaxPermSize=256m" > ${CATALINA_HOME}/bin/setenv.sh
CMD ${CATALINA_HOME}/bin/catalina.sh run
