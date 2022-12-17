const passport = require('passport');
const User = require('../models/userModel.js')
const LocalStrategy = require('passport-local').Strategy;
const validatePassword = require('../utils/passwordUtil').validatePassword



const verifyCallback = async (username, password, done) => {
  try {

    const user = await User.findOne({ email: username })
    if (!user) { return done(null, false) }

    const isValid = validatePassword(password, user)
    if (isValid) return done(null, user);
    else return done(null, false);
  }
  catch (err) {
    done(err)
  }
}
const strategy = new LocalStrategy(verifyCallback)
passport.use(strategy)

passport.serializeUser((user, done) => {
  done(null, user.id);
});
passport.deserializeUser(async (userId, done) => {
  try {
    const user = await User.findById(userId)
    done(null, user)
  }
  catch {
    done(err)
  }
})


