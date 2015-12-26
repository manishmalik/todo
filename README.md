# Todo

A Todo web app built for understanding the RESTful services. Built on Node.JS Express server, and authentication will be done using passport.js and all the data are stored into MongoDB server using mongoose.

#### Key Features :
1. Signin/Signup locally
2. Signin using Facebook and Google using Oauth services
3. Google map to store location
4. Time and Date picker jQuery plugins
5. Store your todo tasks and shows your current todo tasks.
6. nodemailer to mail the user notifying the deadlines.
7. Boostrap frontend interface

### Installation
Before you install make sure you have node.js and npm installed on your system. I have built and tested this code on Ubuntu 14.04. But this app should also work on different environment as well.

1. Install Mongodb on your system ( if you want to run local app)

2. clone this repo and then run `npm install`

3. In `/config` creates two files :
	1. `auth.js` 
		 should contain your authentication information such as oauth api keys and credentials for the mail server. It should be something like this: 
  		```
  		// config/auth.js
		// expose our config directly to our application using module.exports
		module.exports = {

		    'emailInfo' : {
		        'username'        : 'email-address',
		        'password'        : 'password'
		    },
		    'facebookAuth' : {
		        'clientID'        : 'app-id', // your App ID
		        'clientSecret'    : 'app-secret', // your App Secret
		        'callbackURL'     : 'callback-address'
		    },
		
		    'googleAuth' : {
		        'clientID'         : 'app-id',
		        'clientSecret'     : 'app-secret',
		        'callbackURL'      : 'callback-address'
		    }

		};
		```
	2. `database.js` It should contains the identifier to connect to database. It should contain something like this :
	```
	// config/database.js
	module.exports = {
	
	    'url' : 'mongodb://localhost/passport' // looks like mongodb://<user>:<pass>@addr:27017/<username>
	
	};
	```
### TO-Do for this todo-app TODOception ;) : 

- [x] Choose a suitable DB for my app. *MongoDB* will be used.

- [x] Create a signup/signin page
	
	- [x] Simple email & password login
	- [x] Using OAuth service to login with G+ and FB

- [x] Create the Todo dashboard
	
	- [x] Create TODO Schema

	- [x] Add a date and time picker api : [bootstrap-datetimepicker](https://tarruda.github.io/bootstrap-datetimepicker/)
	
	- [x] Use Gmaps to select the locations
		- [x] Choose the current location by default **But it depends whether browser allows/supports geolocation**
		- [x] Reverse Geo-coding for getting place info
		- [x] ~~Store the location lat. and long. in the DB~~ Instead Storing the location/Place name in DB

	- [x] Show the current todo(s)

- [x] Fix the date & time insertion issue
		- It's difficult to insert the date/time into the mongodb. For that matter I will be using moment.js, which basically handles most of the issues related to time format conversions. But still needs some fix.

- [ ] Sending email notification as the due time arrives
	- [x] Current plan is to use ~~mailgun-js~~ **nodemailer** for this purpose
	- [ ] This mail will have two options in it,
		- [ ] Close : Means item is closed.[delete the task from the db]
		- [ ] Push to tomorrow : Will extends the deadline by 1 day. [update the task, by extending the targetDate by 1 day]

- [x] Host it on a webserver.

###Advance Features to add: 

- [ ] Add the Pagination in the ToDo Display (In the case of large number of todo(s) in the list)

- [ ] Add some media queries to make a responsive design

- [ ] Add the JS validations

