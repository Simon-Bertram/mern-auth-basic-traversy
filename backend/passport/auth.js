import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import User from '../models/userModel.js';

// Export the passport configuration (initialize and session) to be used by the server
export default function passportConfig(app) {
  // Initialize Passport and restore authentication state, if any, from the session
  app.use(passport.initialize());
  app.use(passport.session());

  // Configure the local strategy for use by Passport
  passport.use(new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password'
    },
    function (email, password, done) {
      // Replace this with your own logic
      User.findOne({ email })
        .then(user => {
          if (!user) {
            return done(null, false, { message: 'Incorrect email or password' });
          }
          return user.matchPassword(password)
            .then(isMatch => {
              if (isMatch) {
                return done(null, user);
              } else {
                return done(null, false, { message: 'Incorrect email or password' });
              }
            });
        })
        .catch(err => done(err));
    }
  ));

  // Serialize the user object into the session
  passport.serializeUser(function (user, done) {
    done(null, user.id);
  });

  // Deserialize the user object from the session
  passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
      done(err, user);
    });
  });
}
