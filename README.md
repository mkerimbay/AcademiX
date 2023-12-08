# AcademiX 
AcademiX application is a course management system written in JavaScript and built on top of the Express framework.

## Features:

- User management with registration, login, and logout functionalities.
- Course management with listing, viewing, and enrolling/unenrolling options.
- User profile with enrolled courses overview.
- Flash messages for success and error notifications.
- Secure user authentication with Passport and LocalStrategy.
- Session management with Express-session and MongoStore.
- User interface built with EJS and EJS-Mate templates.
- Static files serving for public assets.
- Mongoose for database interactions with MongoDB.

## Technologies:
- Express - Web framework
- EJS - Template engine
- EJS-Mate - EJS extension
- Passport - Authentication library
- Express-session - Session management middleware
- Connect-flash - Flash message middleware
- Method-override - HTTP method override middleware
- Mongoose - Object-document mapper for MongoDB
- MongoDB - NoSQL database

## Mongo Schema
User Schema

``` bash
 
    User
    |
    - username
    |
    - email
    |
    - enrolledCourses: [ Course(_id) ... ]
```
Courses schema

``` bash
 
    Courses
    |
    - name
    |
    - code
    |
    - description
    |
    - enrolledStudents: [ User(_id) ... ]
```

## URL Mapping:

``` bash
/:                                      Home page
/register:                              User registration
/login:                                 User login
/logout:                                User logout
/courses:                               List of courses
/courses/:id:                           View a specific course
/users/:id:                             View a user profile
/enroll/:user_id/:course_id:            Enroll a user in a course
/unenroll/:user_id/:course_id:          Unenroll a user from a course
```

## Additional Notes:

This is a basic implementation of a course management system.
Further development can be done to add features like course creation, editing, and role-based access control.
Please refer to the code comments for detailed explanations of specific functions.

## Contributing:

Feel free to fork this repository and contribute to the project by adding new features, fixing bugs, and improving documentation.

Enjoy using AcademiX!