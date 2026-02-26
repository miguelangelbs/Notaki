import { createContext, useContext, useEffect, useState } from 'react'
import { obtenerUsuarioInvitado, crearCuentaInvitado, obtenerIdInvitado, actualizarNombreInvitado, actualizarPreferenciaTema, resetCuentaInvitado } from '../services/userService'

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {

    useEffect(() => {
        const idActual = obtenerIdInvitado();
        if (!idActual) crearCuentaInvitado();
    }, [])

    const [usuario, setUsuario] = useState(() => obtenerUsuarioInvitado());
    const [theme, setTheme] = useState(() => obtenerUsuarioInvitado()?.theme ?? "dark");

    const handleActualizarNombre = (nuevoNombre) => {
        const usuarioActualizado = actualizarNombreInvitado(nuevoNombre);
        setUsuario(usuarioActualizado);
    }

    const handleActualizarTema = () => {
        const nuevoTema = theme === "dark" ? "light" : "dark";
        setTheme(nuevoTema);
        const usuarioActualizado = actualizarPreferenciaTema(nuevoTema);
        setUsuario(usuarioActualizado);
    }

    const handleResetCuenta = () => {
        const nuevaCuenta = resetCuentaInvitado();
        setUsuario(nuevaCuenta);
        setTheme(nuevaCuenta.theme);
    }

    return (
        <UserContext.Provider value={{ 
            usuario,
            theme,
            handleActualizarNombre,
            handleActualizarTema,
            handleResetCuenta
        }}>
            {children}
        </UserContext.Provider>
    )
}