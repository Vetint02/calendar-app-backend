import express, { urlencoded } from "express"
import session from "express-session"
import cors from "cors"
import passport from "passport"

const app = express();

app.use(cors());
app.use(urlencoded({ extended: true}));
app.use(express.json());

app.get('/', (req, res) =>{
    res.json({message: 'Server is running'})
})

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))