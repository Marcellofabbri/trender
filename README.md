![header](ghithub-header.png)
# Trender

A web-app intended to let the user add records to a database and quickly visualize the data on a chart  drawn against desired target charts or with the possibility to add filters.

### Structure
The whole repository comprises both the backend and the frontend, and I generally push commits for the whole project to Github from the top directory, however the two ends don't intertwine, as *trender-service* contains the backend, while *trender-ui* contains the frontend.

**DATABASE**: Postgres<br>
install Postgres on the machine by following the instructions on the [official Postgres website](https://www.postgresql.org/download/).
For local development create a psql user with password and assign the following environment variables:

```DB_PREFIX``` postgresql<br>
```DB_HOST``` localhost<br>
```DATABASE``` trender<br>
```DB_USERNAME``` the chosen username just created on the machine<br>
```DB_PASSWORD``` the chosen password for said username

On IntelliJ IDEA these can be easily set by clicking on the application's dropdown menu on the top left corner of the windows and selecting *Edit Configurations*.

Also create a database with the same name as the DATABASE environment variable, and another database called *trendertest*. The migration files will do the rest.

**BACKEND**: Java - Spring Boot<br>
install the Java SE Development Kit on the machine by following the instructions on the [official JDK website](https://www.oracle.com/uk/java/technologies/javase/javase-jdk8-downloads.html).

On IntelliJ IDEA make sure maven refreshed the dependencies described on the *pom.xml* file, located on the top level of the backend directory.
On IntelliJ IDEA the backend can easily be started by wiring up the ▶ start button by editing the settings to make it run ```main``` in *src/java/eu/marcellofabbri/trender/TrenderApplication.java*

From the command line maven can refresh and update the dependencies by typing ```mvn clean install -U```.
The service can start on localhost from the command line by typing ```mvn spring-boot:run``` from the backend directory, *trender-service*.

The service is wired to start automatically on port 8081, but can run somewhere else by altering the first line on the *application.property* file

**FRONTEND**: React+Redux<br>
```npm install``` to install all the dependencies<br>
```npm start``` to start the app<br>

The frontend retrieves data from the Redux central store and uses Thunk for asynchronous retrieving of database data in action-creators.

**DOCKER**<br>
Both the backend and frontend folders have their dedicated dockerfile from which containers can be build and run. There is no orchestration at the moment but a docker-compose file could be easily put together.