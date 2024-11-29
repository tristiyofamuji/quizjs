import express from "express";
import cors from "cors";
import FileUpload from "express-fileupload";
import session from "express-session";
import dotenv from "dotenv";
import db from "./config/Database.js";
import SequelizeStore from "connect-session-sequelize";
import UserRoute from "./routes/UserRoute.js";
import AuthRoute from "./routes/AuthRoute.js";
import QuizRoute from "./routes/QuizRoute.js";


dotenv.config();

const app = express();

// Konfigurasi Sequelize Store untuk sesi
const SequelizeSessionStore = SequelizeStore(session.Store);

const store = new SequelizeSessionStore({
    db: db, // Database dari Sequelize
});

// Sinkronisasi database
(async () => {
    try {
        await db.authenticate();
        console.log("Database connected...");
        await db.sync(); // Sinkronisasi tabel database
        console.log("Database synchronized...");
    } catch (error) {
        console.error("Database connection failed:", error);
    }
})();

// Middleware sesi
app.use(
    session({
        secret: process.env.SESS_SECRET || "default_secret_key", // Gunakan variabel lingkungan untuk secret
        resave: false,
        saveUninitialized: true,
        store: store,
        cookie: {
            secure: "auto", // Gunakan auto untuk HTTPS/HTTP
            httpOnly: true,
        },
    })
);

// Middleware CORS
app.use(
    cors({
        credentials: true,
        origin: process.env.CLIENT_ORIGIN || "http://localhost:3000", // Gunakan variabel lingkungan untuk origin
    })
);

// Middleware untuk parsing JSON
app.use(express.json());

// Middleware untuk file upload
app.use(FileUpload());

// Middleware untuk folder public (akses gambar)
app.use(express.static("public"));

// Daftar rute
app.use(UserRoute);
app.use(AuthRoute);
app.use(QuizRoute);


// Sinkronisasi store untuk sesi
store.sync();

// Menjalankan server
const PORT = process.env.APP_PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
