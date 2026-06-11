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

export async function fetchContent(req, res, next){
    try {
        console.log("req.user:", req.user);
        console.log("req.body:", req.body);
        let username = req.user.username;

        const day_contents = await content.find({day: req.body.day, month: req.body.month + 1, year: req.body.year, username: username})
        res.json(day_contents)
    }
    catch (error){
        error.message = "Failed to fetch data"
        next(error);
    }
}