# About this project

This is an assignment from Dhanam

# User stories:
- Create a Node, Mongo, express server
- Create a user model
- Create a route to sign up the user and trigger a welcome mail
- Validate the data during sign up

# How to use this project:
1. Create a .env file in the root directory of this project
2. Create the following environmental variables in the .env file:
   1. APP_CLUSTER_URL (example - cluster1.ypgva.mongodb.net)
   2. APP_DB_NAME (example - myFirstDatabase)
   3. APP_PORT
   4. APP_DB_PASSWORD
   5. APP_DB_USERNAME
   6. GMAIL_ADDRESS (Sender's Gmail address; example - vedant.test.dev@gmail.com)
   7. GMAIL_PASSWORD (Sender's Gmail password)
3. npm install
4. npm start
5. Send a POST request to /users/signup-user with the following fields:
   1. email (required field)
   2. name (required field)
   3. phoneNumber (required field; need to be 10 digits)
   4. gender (required field; need to be either "male" or "female")
   5. about (required field)
   6. password (required field, need to be min 8 chars; should consist of alphanumeric characters only) 

   **All the above fields accept values of type string**