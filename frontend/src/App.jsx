import { Routes, Route  } from 'react-router-dom'
import './App.css'
import PeliculasList from './components/PeliculasList'
import PeliculasDetail from './components/PeliculasDetail'
import CrearResena from './components/CrearResena.jsx';
import Navbar from './components/Navbar'
import Reviews from './components/Reviews'
import CrearPelicula from './components/CrearPelicula'
import { Home, Login, Register } from './pages'
import ProtectedRoutes from './utils/ProtectedRoutes'

function App() {
    return (
    <>
        <Navbar/>
        <div className="main-content">
        <Routes>
            <Route element={<ProtectedRoutes/>}>
                <Route path="/" element={<Home/>} />
            </Route>
            <Route path="/peliculas" element={<PeliculasList/>}/>
            <Route path="/peliculas/:id" element={<PeliculasDetail/>}/>
            <Route path="/reviews" element={<Reviews />} />
            <Route path="/crear-pelicula" element={<CrearPelicula />} />
            <Route path="/crear-resena" element={<CrearResena />} />
            <Route path="/register" element={<Register/>}/>
            <Route path="/login" element={<Login/>}/>
        </Routes>
        </div>
    </>
    )
}

export default App
