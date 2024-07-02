import { useContext } from "react"; // Importo el hook useContext de React
import { AuthContext } from "../context/AuthContext";
import { Navigate, Outlet } from "react-router-dom";// Importo Navigate y Outlet de react-router-dom

const ProtectedRoutes = () => {
    // Extraigo el token de autenticación del contexto de autenticación
    const { auth } = useContext(AuthContext);

    // Creo un objeto authenticated que contiene el token de autenticación
    let authenticated = {'token': auth};


    // Si el token está presente, renderizo el componente Outlet, que representa las rutas protegidas.
    // Si el token no está presente, redirijo al usuario a la página de login.
    return (
        authenticated.token ? <Outlet/> : <Navigate to="/login"/>
    )
}

export default ProtectedRoutes;