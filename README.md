# node-todoList
This is my first own fullstack app. Recently I spent some time learning backend development and because I am quite proficient with JavaScript I choose to learn NODEjs with Express framework which seemed to be the easiest for me, as well as using MongoDB as the backend database. For user authentication I used JWT tokens. For viewing some simple frontend I choose ejs view engine and because this project was mainly about learning the backend logic I styled everything in one CSS file.
In order to run this app run you need to download this repo, create .env file with the database connection URI (MONGO_URI) and number of the port where you want to run the server (PORT) and run. For user authentication you have to add SECRET variable too. 
##### `node server.js`

The app is up and running on this domain:

[todo-backend-app](https://todo-backend-app.cyclic.cloud)

There are a few registered users in the database with some preset todos, but you can create your own account and add your own todos, which you can later mark as finished or delete. The app allows admin to manage the currently registered users, admin can delete users and see theirs todo items. To try out admin user log in with these credentials:

Name: Admin
Password: testadmin

**Feel free to play with it as much as you want**
