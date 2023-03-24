/**-------All the imports of libraries-------*/
import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";

/**-------All the imports of files-------*/
import { register } from "./controllers/auth.controller.js";

import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/users.routes.js";
import postsRoutes from "./routes/posts.routes.js";
import { verifyToken } from "./middleware/auth.middleware.js";
import { createPosts } from "./controllers/posts.controller.js";
import User from "./models/User.js";
import Post from "./models/Post.js";
import { users, posts } from "./data/index.js ";

/**-------CONFIGURATIONS--------*/
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const app = express();
app.use(express.json());

app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(cors());
app.use("/assets", express.static(path.join(__dirname, "public/assets")));

/**-------File Storage--------*/
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/assets");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

/**-------ROUTES WITH FILES--------*/
app.post("/auth/register", upload.single("picture"), register);
app.post("/posts", verifyToken, upload.single("picture"), createPosts);
/**-------ROUTES--------*/
app.use("/auth", authRoutes);
app.use("/user", userRoutes);
app.use("/posts", postsRoutes);

/**-------MONGOOSE SETUP--------*/
const PORT = process.env.PORT || 6001;
mongoose
  .connect(process.env.MONGO_URL, {
    useNewURLParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Server port: ${PORT}`));

    /**-------Add Data one time-------- */
    // User.insertMany(users);
    // Post.insertMany(posts);
  })
  .catch((error) => console.log(`${error} did not connect`));
