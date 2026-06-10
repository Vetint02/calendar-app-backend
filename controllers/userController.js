import user from "../schema/users.js";
import content from "../schema/content.js"

export async function registerUser(req, res, next){
    try {
        let {username, password} = req.body;

        const existingUsers = await user.find();

        let n = existingUsers.length;

        for (let i = 0; i < n; i++) {
            if (existingUsers[i].username === username) {
                const err = new Error("Username already exists");
                err.status = 400;
                return next(err);
            }
        }

        await user.create({ username, password });
        res.json("user created successfully");
    }
    catch (error) {
        next(error);
    }
}