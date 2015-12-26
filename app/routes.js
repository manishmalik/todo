module.exports = function(app, passport) {

// normal routes ===============================================================

    var todo = require('./models/todo');

    // show the home page (will also have our login links)
    app.get('/', function(req, res) {
        res.render('index.ejs');
    });

    // PROFILE SECTION =========================
    app.get('/profile', isLoggedIn, function(req, res) {
        
        todo.find({user: req.user}, function(err, todos){
            res.render('profile.ejs', {
                user : req.user,
                todo : todos
            });
        }); 
        
    });
    /*
        Handler to add a new todo in the list
    */
    app.post('/add',isLoggedIn, function(req, res){
        var newTodo = new todo();
        newTodo.task = req.headers.task;
        newTodo.targetDate = req.headers.targetdate;
        newTodo.location = req.headers.location;
        newTodo.user  = req.user;
        newTodo.save(function(err){
            if(err)
                res.json(err);
            else
                res.send('success');
        });
    });
    /*
        Handler to delete a ToDo on request by the user
        TODO:
            Fix, vague delete. A case when a loggedin user can delete someone else's todo by knowing it's object
            id, which is not very difficult to get (simply the value of attribut 'value').
    */
    app.post('/delete',isLoggedIn, function(req, res){
        console.log(req.body.data);
        for(var i=0;i<req.body.data.length;i++){
            todo.find({_id:req.body.data[i]},function(err,todos){
                // console.log("User from todo : "+todos[0].user+"Type of : "+typeof todos[0].user);
                // console.log("User from Req : "+req.user._id+"Type of : "+typeof req.user._id);
                // if(todos[0].user===req.user._id)
                //     console.log("Authorize user !");
                if(err)
                    res.json(err);
            }).remove().exec();
        }
        res.redirect('success');
    });

    // LOGOUT ==============================
    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });

// =============================================================================
// AUTHENTICATE (FIRST LOGIN) ==================================================
// =============================================================================

    // locally --------------------------------
        // LOGIN ===============================
        // show the login form
        app.get('/login', function(req, res) {
            res.render('login.ejs', { message: req.flash('loginMessage') });
        });

        // process the login form
        app.post('/login', passport.authenticate('local-login', {
            successRedirect : '/profile', // redirect to the secure profile section
            failureRedirect : '/login', // redirect back to the signup page if there is an error
            failureFlash : true // allow flash messages
        }));

        // SIGNUP =================================
        // show the signup form
        app.get('/signup', function(req, res) {
            res.render('signup.ejs', { message: req.flash('signupMessage') });
        });

        // process the signup form
        app.post('/signup', passport.authenticate('local-signup', {
            successRedirect : '/profile', // redirect to the secure profile section
            failureRedirect : '/signup', // redirect back to the signup page if there is an error
            failureFlash : true // allow flash messages
        }));

    // facebook -------------------------------

        // send to facebook to do the authentication
        app.get('/auth/facebook', passport.authenticate('facebook', { scope : 'email' }));

        // handle the callback after facebook has authenticated the user
        app.get('/auth/facebook/callback',
            passport.authenticate('facebook', {
                successRedirect : '/profile',
                failureRedirect : '/'
            }));


    // google ---------------------------------

        // send to google to do the authentication
        app.get('/auth/google', passport.authenticate('google', { scope : ['profile', 'email'] }));

        // the callback after google has authenticated the user
        app.get('/auth/google/callback',
            passport.authenticate('google', {
                successRedirect : '/profile',
                failureRedirect : '/'
            }));

// =============================================================================
// AUTHORIZE (ALREADY LOGGED IN / CONNECTING OTHER SOCIAL ACCOUNT) =============
// =============================================================================

    // locally --------------------------------
        app.get('/connect/local', function(req, res) {
            res.render('connect-local.ejs', { message: req.flash('loginMessage') });
        });
        app.post('/connect/local', passport.authenticate('local-signup', {
            successRedirect : '/profile', // redirect to the secure profile section
            failureRedirect : '/connect/local', // redirect back to the signup page if there is an error
            failureFlash : true // allow flash messages
        }));

    // facebook -------------------------------

        // send to facebook to do the authentication
        app.get('/connect/facebook', passport.authorize('facebook', { scope : 'email' }));

        // handle the callback after facebook has authorized the user
        app.get('/connect/facebook/callback',
            passport.authorize('facebook', {
                successRedirect : '/profile',
                failureRedirect : '/'
            }));


    // google ---------------------------------

        // send to google to do the authentication
        app.get('/connect/google', passport.authorize('google', { scope : ['profile', 'email'] }));

        // the callback after google has authorized the user
        app.get('/connect/google/callback',
            passport.authorize('google', {
                successRedirect : '/profile',
                failureRedirect : '/'
            }));

// // =============================================================================
// // UNLINK ACCOUNTS =============================================================
// // =============================================================================
// // used to unlink accounts. for social accounts, just remove the token
// // for local account, remove email and password
// // user account will stay active in case they want to reconnect in the future

//     // local -----------------------------------
//     app.get('/unlink/local', isLoggedIn, function(req, res) {
//         var user            = req.user;
//         user.local.email    = undefined;
//         user.local.password = undefined;
//         user.save(function(err) {
//             res.redirect('/profile');
//         });
//     });

//     // facebook -------------------------------
//     app.get('/unlink/facebook', isLoggedIn, function(req, res) {
//         var user            = req.user;
//         user.facebook.token = undefined;
//         user.save(function(err) {
//             res.redirect('/profile');
//         });
//     });

//     // google ---------------------------------
//     app.get('/unlink/google', isLoggedIn, function(req, res) {
//         var user          = req.user;
//         user.google.token = undefined;
//         user.save(function(err) {
//             res.redirect('/profile');
//         });
//     });


};

// route middleware to ensure user is logged in
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();

    res.redirect('/');
}
