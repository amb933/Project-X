# Project-X

This project consists of creating an application for digital service requests.

## Install

- Create an empty database on a local MySQL instance.

- Save the .env.example file as .env and fill in the necessary data. 

- Run "npm run initDB" to create the necessary tables in the previously created database.

- Run "npm run dev" to launch the server.

## Entities

-   User:

    -   id
    -   username
    -   avatar (optional)
    -   biography (optional)
    -   email
    -   password
    -   createdAt
    -   modifiedAt

-   Services:

    -   id
    -   idUser
    -   title
    -   description
    -   file
    -   category: ('Programming and Development',
        'Design and art',
        'Music and Audio',
        'Video and Animation',
        'Writing and Translation',
        'Administrative and Secretary',
        'Digital Marketing',
        'Business',
        'Various')
    -   realized (booleano)
    -   createdAt
    -   modifiedAt

-   Replies:
    -   id
    -   idUser
    -   idService
    -   finalFile
    -   observations
    -   createdAt

## Endpoints

### Users:✅

-  POST [/users] - User registration.✅File: newUser.js
-  POST [/users/login] - User login (returns token)✅File: loginUser.js
-  GET [/users] - Returns user logged information. TOKEN✅File: getOwnUser.js 
-  PUT [/users] - Edit your username, email or avatar. TOKEN✅File: editUser.js

### Services:✅

-  POST [/services] - Allows to create a service. TOKEN✅ File: newService.js
-  GET [/services] - List all services.✅ File: listServices.js
-  GET [/services/:idService] - Returns information from a specific service.✅File: getService.js
-  POST [/services/:idService] - Comment a service. TOKEN ✅ File: replyService.js
-  PUT [/services/:idService] - Modify or finish a service. TOKEN ✅ File: editService.js
