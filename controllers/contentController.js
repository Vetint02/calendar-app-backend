import content from "../schema/content.js";

export async function createContent(req, res, next){
    try {
        if (!req.user) {
            const error = new Error("You must be logged in to create content.");
            error.status = 401;
            next(error);
        }
        
        var { year, month, day, notice } = req.body;

        var username = req.user.username;

        await content.create({ username, year, month, day, notice });

        res.json("data successfully created");
    }
    catch (error){
        error.message = "failed to create content";
        next(error);
    }
};