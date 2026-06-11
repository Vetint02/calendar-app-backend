import passport from "../config/passport.js"

export const loginUser = (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        console.log('err:', err);
        console.log('user:', user);
        console.log('info:', info);
        if (err) {
            return next(err)
        }
        if (!user) {
            return res.status(401).json({ message: info.message || "Login failed" })
        }

        req.logIn(user, (err) => {
            if (err) {
                return next(err)
            };

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
        res.json({message: "Logged out"});
    });
};

export function ensureAuthentication(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    else {
        res.status(401).json({message: "authentication failed"});
    }
};

export function frontEndAuthentication(req, res) {
    if (req.isAuthenticated())
    {
        return res.json({
            isAuthenticated: true,
            user: {
                id: req.user._id,
                username: req.user.username
            }
        })
    }
    else{
        return res.json({
            isAuthenticated: false,
            user: null
        })
    }
}