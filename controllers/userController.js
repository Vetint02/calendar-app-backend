import bcrypt from 'bcrypt';
import User from "../schema/users.js";

export async function registerUser(req, res, next) {
    try {
        const { username, password } = req.body;

        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ message: 'Username already taken.' });
        }

        const hashAmount = 12;
        const hashedPassword = await bcrypt.hash(password, hashAmount);

        const newUser = await User.create({
            username,
            password: hashedPassword
        });

        res.status(201).json({ message: 'Account created successfully.' });
    } catch (error) {
        next(error);
    }
}