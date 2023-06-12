import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import helmet from "helmet";
import morgan from "morgan";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import connection from "./connection/database.js";
import { registerUser } from "./controllers/auth.js";
import { createPost } from "./controllers/post.js";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/user.js";
import postRoutes from "./routes/post.js";
import { verifyToken, verifyUser } from "./middlewares/auth.js";



/**CONFIGURATION */

const __fileName = fileURLToPath(import.meta.url);
const __dirName = path.dirname(__fileName);

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use("/assets", express.static(path.join(__dirName, 'public/assets')));

/** FILE STORAGE */

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "public/assets");
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

const upload = multer({ storage }); //whenever we want to upload anything we will use this upload variable


/** ROUTES WITH FILES */

app.post("/auth/register", upload.single("picture"), verifyUser, registerUser);
app.post("/posts", verifyToken, upload.single("picture"), createPost);

/** ROUTES */

app.use("/auth", authRoutes);
app.use("/user", userRoutes);
app.use("/posts", postRoutes);

/** CONNECTION */

const port = process.env.PORT || 8001;

/** start a server only there will be a valid DB connection */

connection()
.then(() => {
    try {
        app.listen(port, () => console.log(`Server port: ${port}`));

;    } catch (error) {
        console.log("unable to connect to the server");
    }
})
.catch((error) => console.log(`${error} didn't connect`));