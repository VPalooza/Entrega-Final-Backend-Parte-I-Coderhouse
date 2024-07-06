import express from "express";
import { createServer } from "http";
import { Server as SocketIOServer } from "socket.io";
import indexRoutes from "./routes/index.js";
import __dirname from "./tools/dirname.js";
import handlebars from "express-handlebars";
import viewRoutes from "./routes/view.routes.js";
import productRoutes from "./routes/products.routes.js";
import path from "path";

const app = express();
const PORT = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.resolve(__dirname, "../public")));

// Configuración de Handlebars
app.engine(
    "hbs",
    handlebars.engine({
        extname: ".hbs",
        defaultLayout: "main",
    })
);

app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "../views"));


// Rutas bajo /api
app.use("/api", indexRoutes);
app.use("/api/products", productRoutes);

// Rutas de vista
app.use("/", viewRoutes); // Coloca las rutas de vista al final para evitar conflictos

// Ruta raíz
app.get("/", (req, res) => {
    res.send("Bienvenido a la API. Usa /api/carts o /api/products para acceder a los recursos.");
});

// Crear el servidor HTTP
const server = createServer(app);

// Configuración de Socket.io
const io = new SocketIOServer(server);
io.on("connection", (socket) => {
    console.log("Conexión establecida", socket.id);

    socket.on("disconnect", () => {
        console.log("Cliente desconectado", socket.id);
    });
});

// Iniciar el servidor
server.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto http://localhost:${PORT}`);
});
