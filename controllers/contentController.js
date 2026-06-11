import content from "../schema/content.js";

export async function createContent(req, res, next) {
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
    catch (error) {
        error.message = "failed to create content";
        next(error);
    }
};

export async function fetchContent(req, res, next) {
    try {
        if (!req.user) {
            const error = new Error("You must be logged in to update content.");
            error.status = 401;
            return next(error);
        }
        let username = req.user.username;

        const day_contents = await content.find({ day: req.body.day, month: req.body.month + 1, year: req.body.year, username: username })
        res.json(day_contents)
    }
    catch (error) {
        error.message = "Failed to fetch data"
        next(error);
    }
}

export async function editContent(req, res, next) {
    try {
        const username = req.user.username;
        const { id, day, month, year, notice } = req.body;

        const updated = await content.findOneAndUpdate(
            { _id: id, username },
            { day, month, year, notice },
            { new: true }
        );

        if (!updated) {
            return res.status(404).json({ message: 'Note not found' });
        }

        res.status(200).json(updated);
    } catch (error) {
        next(error);
    }
}

export async function deleteContent(req, res, next) {
    console.log('deleteContent hit');
    console.log('params:', req.params);
    console.log('full url id:', req.params.id);
    try {
        const username = req.user.username;
        const { id } = req.params;

        const deleted = await content.findOneAndDelete(
            { _id: id, username }   // username check so users can only delete their own
        );

        if (!deleted) {
            return res.status(404).json({ message: 'Note not found' });
        }

        res.status(200).json({ message: 'Note deleted successfully' });
    } catch (error) {
        next(error);
    }
}

export async function getMonthContent(req, res, next) {
    try {
        const username = req.user.username;
        const { month, year } = req.query;

        const notices = await content.find({
            username,
            month: parseInt(month),
            year: parseInt(year)
        });

        res.status(200).json(notices);
    } catch (error) {
        next(error);
    }
}
