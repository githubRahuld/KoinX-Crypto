import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(
    cors({
        origin: process.env.CORS_ORIGIN,
        credentials: true,
    })
);

app.use(express.json({ limit: "16kb" })); //to allow json data

app.use(express.urlencoded({ extended: true, limit: "16kb" })); // to make url same at all places

app.use(express.static("public")); // to store things locally in public folder

app.use(cookieParser()); // to access cookies from users browser using server

//import Routes
import cryptoRouter from "./routes/crypto.routes.js";


app.get("/", (req, res) => {
    app.send("Welcome to KroinX-Crypto World");
});
app.use("/api/v1/crypto", cryptoRouter);

export { app };
