To get this application running first use yarn package manager to install all dependencies 'yarn'

next run the command 'yarn start' to get the application running

the front end is running on port 3000

The url for the production application is at url: https://collegesearchfrontend.herokuapp.com/

This is a react application which allows users to search for 195 colleges in the massachusetts area
There is pagination to allow for organization of 20 colleges per page
There is a search feature that allows users to search colleges by college name or the city that the college is located in.

To see more information about the college, click "Learn More" to be brought to the show page.
On this page you will find all the details of the college.
It will also provide all the programs that a particular college offers along with a tooltip with more details about each program when hovered over.

This application is pulling all its data from a flask backend and a postgres database.
The backend url is https://collegesearchbackend.herokuapp.com/

This application is using the following api requests

GET /ma-schools -> a list of all the colleges in massachusetts
GET /ma-schools/<name> -> one college from a list of colleges in massachusetts
GET /programs -> a list of offered programs
GET /fields -> a list of fields related to each college