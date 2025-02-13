import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

// cors configuration
const corsOptions = {
  origin:process.env.CORS_ORIGIN,
  credentials: true, 
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"], 
  allowedHeaders: ["Content-Type", "Authorization"], 
};

// Apply CORS to all routes
app.use(cors(corsOptions));

// Ensure preflight (OPTIONS) requests also use the same CORS settings
app.options("*", cors(corsOptions));

app.use(express.json({ limit: "16kb" })); //to allow json data

app.use(express.urlencoded({ extended: true, limit: "16kb" })); // to make url same at all places

app.use(express.static("public")); // to store things locally in public folder

app.use(cookieParser()); // to access cookies from users browser using server

//import Routes
import cryptoRouter from "./routes/crypto.routes.js";


app.get("/", (req, res) => {
    res.send("Welcome to KroinX-Crypto World");
});
app.use("/api/v1/crypto", cryptoRouter);

export { app };
