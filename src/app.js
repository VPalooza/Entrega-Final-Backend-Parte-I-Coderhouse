import express from "express";
import routes from "./routes/index.js";
import path from "path";
import { fileURLToPath } from "url";
import { engine } from "express-handlebars";
import { Server } from "socket.io";
import http from "http";
import socketHandler from "./tools/socket.js";
import mongoose from "mongoose";

const app = express();
const PORT = process.env.PORT || 3000;

const mongoUri =
    process.env.MONGO_URI || "mongodb://localhost:27017/mydatabase";

// Conectar a la base de datos
mongoose
    .connect(mongoUri)
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch((err) => {
        console.error("Failed to connect to MongoDB", err);
    });

app.use(express.json());
app.use("/", routes);

// Middleware para servir archivos estáticos
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, "public")));

app.engine(
    "hbs",
    engine({
        extname: "hbs",
        defaultLayout: "main",
    })
);

// Configurar hbs
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views"));

const httpServer = http.createServer(app);
const io = new Server(httpServer);
socketHandler(io);

httpServer.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
