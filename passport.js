// var passport = require("passport");
// var localStrategy = require("passport-local");

// var User = {
//     USERNAME : 'Khalid',
//     PASSWORD : '123456'
// }

// passport.use("login", new localStrategy({
//     usernameField : 'USERNAME',
//     passwordField :'PASSWORD'
// }, function(username, password, done){
//     User.checkPassword(password, function(err, isMatch){
//         if (err) {return done(err); }
//         if (isMatch){
//             return done(null, username);
//         }else {
//             return done(null,false, {message: "invalid"});
//         }
//     });
// })); //incomplete