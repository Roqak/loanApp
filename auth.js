var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;
var opts = {};
require('dotenv').config()
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.JWT_SECRET;
module.exports = passport =>{
    passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
        var user = ({id: jwt_payload.id});
            if (user) {
                return done(null, user);
                res.status(200).json({jso:"Done"})
            } else {
                return done(null, false);
                // or you could create a new account
            }
        })
    );
};