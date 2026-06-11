import 'dotenv/config'
import express, { urlencoded } from "express"
import session from "express-session"
import cors from "cors"
import passport from "passport"
import connectMongoDB from './config/connectDB.js'
import MongoStore from "connect-mongo";
import {ensureAuthentication} from "./controllers/authController.js"

// -----------Routes----------------
import authRoutes from './routes/authRoutes.js'
import contentRoutes from './routes/contentRoutes.js'
import userRoutes from './routes/userRoutes.js'

const app = express();
const PORT = process.env.PORT || 5000;

await connectMongoDB();

app.use(cors({
    origin: "https://calendar-app-yuze.onrender.com",
    credentials: true
}));
app.use(urlencoded({ extended: true}));
app.use(express.json());

app.use(session({
    secret: process.env.sessionSecret,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
        mongoUrl: process.env.MONGODB_URI,
    }),
    cookie: {
        secure: false,
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000
    }
}));

app.use(passport.initialize());
app.use(passport.session());

app.use('/api/content', ensureAuthentication, contentRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);

app.get('/', (req, res) =>{
    res.json({message: 'Server is running'})
})

app.use((req, res, next) => {
    const error = new Error(`Route not found: ${req.method}, ${req.url}`);
    error.status = 404;
    next(error);
});

app.use((err, req, res, next) => {
    const error = err.status || 500;

    res.status(error).json({
        error: {
            message: err.message || "internal server error",
            status: error
        },
    });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))