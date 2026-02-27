import { createContext, useContext, useState } from 'react'
import { obtenerUsuarioInvitado, crearCuentaInvitado, actualizarNombreInvitado, actualizarPreferenciaTema, resetCuentaInvitado, agregarTablero } from '../services/userService'

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {

    const [usuario, setUsuario] = useState(() => {
        const usuarioExistente = obtenerUsuarioInvitado();
        if (usuarioExistente) return usuarioExistente;
        return crearCuentaInvitado();
    });

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

    const handleAgregarTablero = (titulo, color) => {
        const usuarioActualizado = agregarTablero(titulo, color);
        setUsuario(usuarioActualizado);
    }

    return (
        <UserContext.Provider value={{ 
            usuario,
            theme,
            handleActualizarNombre,
            handleActualizarTema,
            handleResetCuenta,
            handleAgregarTablero
        }}>
            {children}
        </UserContext.Provider>
    )
}