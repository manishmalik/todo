# Todo

A Todo web app built for understanding the RESTful services. Built on Node.JS Express server, and authentication will be done using passport.js

### TO-Do for this todo-app TODOception ;) : 

- [x] Choose a suitable DB for my app. *MongoDB* will be used.

- [x] Create a signup/signin page
	
	- [x] Simple email & password login
	- [x] Using OAuth service to login with G+ and FB

- [ ] Create the Todo dashboard
	
	- [x] Create TODO Schema

	- [x] Add a date and time picker api : [bootstrap-datetimepicker](https://tarruda.github.io/bootstrap-datetimepicker/)
	
	- [ ] Use Gmaps to select the locations
		- [x] Choose the current location by default **But it depends whether browser allows/supports geolocation**
		- [x] Reverse Geo-coding for getting place info
		- [ ] ~~Store the location lat. and long. in the DB~~ Instead Storing the location/Place name in DB

	- [ ] Show the current todo(s)

- [ ] Sending email notification as the due time arrives
	- [ ] Current plan is to use mailgun-js for this purpose
	- [ ] This mail will have two options in it,
		- [ ] Close : Means item is closed.
		- [ ] Push to tomorrow : Will extends the deadline by 1 day.

- [ ] Host it on a webserver.

###Advance Features to add: 

- [ ] Add the Pagination in the ToDo Display (In the case of large number of todo(s) in the list)

- [ ] Add some media queries to make a responsive design