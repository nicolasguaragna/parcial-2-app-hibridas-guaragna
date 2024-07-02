import { createContext, useEffect, useState } from "react"
import Cookies from "js-cookie" // Importo js-cookie para manejar las cookies
import {jwtDecode} from "jwt-decode" // Importo jwt-decode para decodificar el token JWT

export const AuthContext = createContext()

export const AuthContextProvider = ({ children }) => {
    const [usuario, setUsuario] = useState(null)// Estado para almacenar los datos del usuario

    const auth = Cookies.get('jwToken') || null; // Obtengo el token JWT de las cookies o null si no existe

    useEffect (() => {
        if (auth) {// Si existe el token JWT
            try {
            const decoded = jwtDecode(auth)// Decodifico el token JWT
            console.log("Decoded Token:", decoded);  // <-- Verificar el token decodificado
            setUsuario({
                nombre: decoded.usuario.nombre,
                id: decoded.usuario._id,
                email: decoded.usuario.email,
            });// Guardo los datos del usuario en el estado
        } catch (error) {
            console.error("Error decoding token:", error);  // <-- Manejar errores de decodificación
        }
        }
    }, [auth]);

    const logoutUsuario = () => {
        setUsuario(null);// Reseteo el estado del usuario
        Cookies.remove('jwToken');// Elimino el token JWT de las cookies
    };

    return (
        <AuthContext.Provider value={{ usuario, setUsuario, auth, logoutUsuario }}>
            {children}
        </AuthContext.Provider>
    );
};

export {jwtDecode};
