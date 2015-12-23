# Todo

A Todo web app built for understanding the RESTful services. Built on Node.JS server.

### TO-Do for this todo-app TODOception ;) : 

- [ ] Choose a suitable DB for my app.

- [ ] Create a signup/signin page
	
	- [ ] Simple email & password login
	- [ ] Using OAuth service to login with G+ and FB

- [ ] Create the Todo dashboard
	
	- [ ] Add a date and time picker api : [bootstrap-datetimepicker](https://tarruda.github.io/bootstrap-datetimepicker/)
	
	- [ ] Use Gmaps to select the locations
		- [ ] Choose the current location by default
		- [ ] Store the location lat. and long. in the DB
		- [ ] Reverse Geo-coding for getting place info

	- [ ] Show the current todo(s)

- [ ] Sending email notification as the due time arrives
	- [ ] Current plan is to use mailgun-js for this purpose
	- [ ] This mail will have two options in it,
		- [ ] Close : Means item is closed.
		- [ ] Push to tomorrow : Will extends the deadline by 1 day.

-[ ] Host it on a webserver.