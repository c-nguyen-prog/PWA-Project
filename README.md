# progappjs
Progressive banking application.

**Dependencies**:

Frontend: 

    Ionic 3
    Nodejs 8.12 LTS

Backend:

    python 3.6+
    tornado 5.1
    motor 2.0.0 


# Instructions

**Using MongoDB and Python backend**:
1. Install mongoDB either through the package manager or directly from the source 

2. Open terminal and type in:
```
mongo
```

3. Once mongo has started open a new terminal and create the database using
```
use progappjs
```

4. Proceed to insert a new entry into the database using a JSON object e.g:
```
db.users.insertOne({"username":"hereGoesTheUsernameYouWantToAdd","password":"hereGoesThePasswordOfTheUser"})
```
Now you may optionally check all the entries(in this case only one assuming you did it correctly) by using the command:
```
db.users.find()
```

5. Open a new terminal tab and initiate the database by the use of the command: 
```
mongod
```

6. Run the main function of the Tornado server

7. Open Postman, set the HTTP verb to **POST** select *raw* in the **Body** tab and provide your input as a JSON object e.g:
```
{
"username":"hereGoesTheUsernameTryingToLogin",
"password":"hereGoesThePasswordOfTheUser",
}
```
8. Send and check the response. If the user exists and the credentials are correct the response is *success*, lest it responds *failed*.
