import passport from "passport"
import Strategy from "passport-local"
import User from "../schema/users.js"

passport.use(new Strategy(
    async function (username, password, done) {
        try {
            const currentUser = await User.findOne({ username: username});
            if (!currentUser || currentUser.password!== password) {
                return done(null, false, { message: "Incorrect username or password"});
            }

            return done(null, currentUser)
        }
        catch (err) {
            return done(err);
        }
    }
))

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    // Fetch information from database
    try {
        const loggedInUser = await User.findById(id);;
        done(null, loggedInUser);
    } catch (error) {
        console.error("Failed to deserialize user:", error);
        done(error, null);
    }
});

export default passport;