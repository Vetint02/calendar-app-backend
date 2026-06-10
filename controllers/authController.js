import passport from "../config/passport.js"

export const loginUser = (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) return next(err);
        if (!user) return res.status(401).json({ message: info.message || "Login failed" });

        req.logIn(user, (err) => {
            if (err) return next(err);

            return res.json({
                message: "Successfully Authenticated",
                user: { id: user._id, username: user.username }
            });
        });
    })(req, res, next);
};

export const logoutUser = (req, res, next) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        res.redirect('/');
    });
};

export function ensureAuthentication(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    else {
        res.json('authentication failed');
    }
};