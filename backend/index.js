import express from "express"
import mongoose from "mongoose"
import "dotenv/config"
import usuarios from "./routes/usuarios_routes.js"
import peliculas from "./routes/peliculas_routes.js"
import reviews from "./routes/reviews_routes.js"
import auth from "./routes/auth.js"
import cors from "cors"

// mongodb://127.0.0.1:27017/parcial-app-hibridas
mongoose
    .connect(process.env.MONGO_URL)
    .then(() => console.log("Conectado a MongooDB"))
    .catch(() => console.log("error al conectar"))

    // mongodump --db=parcial-app-hibridas
    // mongorestore --uri mongodb+srv://fernandoguaragna:1234@cluster1.xp2qlbi.mongodb.net/parcial-app-hibridas "C:\Users\nico_\OneDrive\Escritorio\Nueva carpeta\dump\parcial-1-app-hibridas"


const app = express()

//allow all origins
app.use(cors());

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use("/usuarios", usuarios)
app.use("/peliculas", peliculas)
app.use("/reviews", reviews)
app.use("/login", auth)

const port = process.env.PORT || 3002;
app.listen(port, () => {
    console.log(`Servidor corriendo en el puerto ${port}`);
});