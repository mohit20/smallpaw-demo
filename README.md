# smallpaw-demo

SmallPaw demo application.

The following API endpoints are implemented :-

1) "/" - It is the main page which returns the login.html page. On entering the correct credentials, user will be able login as the submit button will call the "/user/login" api. 

2)"/signup" - It is a POST api endpoint which takes the user name, email id and password, validates the data and store it into the database. It will return the registration.html page.

3)"/user/login" - This will enable the user to login. It will return the index.html file.

4)"/dummy" - This will return the index.html file if the user is logged in, else will return the login.html file.

5)"/logout" - This will be called when the Logout button is clicked in index.html. This logout the userand the user will have to login again to access index.html. 

The database used is set up on the local system so you will have to setup the mongodb database on your system to implement this project or you can change the URI given in /config/db.js file to connect to your db. 