const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth2').Strategy;

passport.serializeUser(function(user, done) {
    /*
    From the user take just the id (to minimize the cookie size) and just pass the id of the user
    to the done callback
    PS: You dont have to do it like this its just usually done like this
    */
    done(null, user);
  });
  
passport.deserializeUser(function(user, done) {
    /*
    Instead of user this function usually recives the id 
    then you use the id to select the user from the db and pass the user obj to the done callback
    PS: You can later access this data in any routes in: req.user
    */
    done(null, user);
});

passport.use(new GoogleStrategy({
    clientID:process.env.GOOGLE_CLIENT_ID,
    clientSecret:process.env.GOOGLE_CLIENT_SECRET,
    callbackURL:process.env.CALLBACK_URL,
    passReqToCallback:true
  },
  function(request, accessToken, refreshToken, profile, done) {
    console.log(profile)
    return done(null, profile);
  }
));

/*
.env
GOOGLE_CLIENT_ID= 746304438363-2csbqru6tlsrho2h99tp9mjg7p3081u3.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET= Nu-rdZXvxmm5hlmm6frxvI9R
CALLBACK_URL= http://localhost:5000/google/callback
*/
