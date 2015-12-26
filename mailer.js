// retrieves todo schema
var todo = require('./app/models/todo');
// retrives user schema
var user = require('./app/models/user');
// Nodemailer for sending out mails
var nodemailer = require('nodemailer');

// load the auth variables
var configAuth = require('./config/auth'); // use this one for testing

// create reusable transporter object using SMTP transport
var transporter = nodemailer.createTransport({
    service: 'Mailgun',
    auth: {
        user: configAuth.emailInfo.username,
        pass: configAuth.emailInfo.password
    }
});

// Moment for working with time
var moment = require('moment');
var object = {};

object.init = function(){
	todo.find({}, function(err, todos){
		todos.sort({targetDate:1});
		if(err){
			console.log(err);
			return;
		}
		else{
			todos.forEach(function(data){	
				var tDate = moment(data.targetDate);
				var cDate = moment(Date.now());
				var diff = tDate.diff(cDate);
				if(diff<=900000){
					// console.log(data.targetDate);
					user.find({_id:data.user},function(err,users){
						if(err){
							console.log(err);
							return;
						}
						if(diff<=0){
							// console.log(data.targetDate);
							console.log('deleting task from todo for '+users[0].name+'\n Reason : Target Date and Time expired , '
								+moment(data.targetDate).format("dddd, MMMM Do YYYY, h:mm:ss a"));
							todo.find({_id:data._id}).remove().exec();
						}
						else{
							// console.log(data);

							// This will ensure that the mail should be send once
							if(!data.isCompleted){
								//console.log('Todo: Mail '+users[0].name+' about the expiration of the targetDate : '+moment(data.targetDate).format("dddd, MMMM Do YYYY, h:mm:ss a"));
								// setup e-mail data with unicode symbols
								var emailadd;
								if(typeof users[0].google.email !== undefined && users[0].google.email.length>0)
									emailadd = users[0].google.email;
								else if(typeof users[0].facebook.email !== undefined && users[0].facebook.email.length>0)
									emailadd = users[0].facebook.email;
								else
									emailadd = users[0].local.email;

								var msg = 'Your task : '+'<b>'+data.task+'</b>'+' at <b>'+data.location+'</b> is expiring very soon. Its the time to respond to it : </br>'+'<ul>'+
											'<li><b>'+'To extend the deadline by one day click : <a href="'+'#'+'"> here </a></b></li>'+
											'<li><b>'+'To close this task click : <a href="'+'#'+'"> here </a></b></li></ul>';
								var mailOptions = {
								    from: 'ToDo App <donotreply@todo.app>', // sender address
								    to: emailadd, // list of receivers
								    subject: 'You have task pending in next 15 minutes', // Subject line
								    html: msg // html body
								};

								// send mail with defined transport object
								transporter.sendMail(mailOptions, function(error, info){
								    if(error){
								        return console.log(error);
								    }
								    console.log('Mail sent to '+users[0].name+' about the expiration of the targetDate : '+moment(data.targetDate).format("dddd, MMMM Do YYYY, h:mm:ss a")+'\n Response code : ' + info.response);

								});
								data.isCompleted = true;
								data.save();
							}
						}
					});
				}
			});
		}
	});
}

module.exports = object;