import { createContext, useContext, useState } from 'react'
import { obtenerUsuarioInvitado, crearCuentaInvitado, actualizarNombreInvitado, actualizarPreferenciaTema, resetCuentaInvitado } from '../services/userService'
import { agregarTablero, editarTablero, eliminarTablero, reordenarTableros } from '../services/boardService';
import { agregarColumna, editarColumna, eliminarColumna, reordenarColumnas } from '../services/columnService';
import { agregarTarea, editarTarea, eliminarTarea, moverTarea, reordenarTareas } from '../services/taskService';

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

    const handleReordenarTableros = (tablerosReordenados) => {
        const usuarioActualizado = reordenarTableros(tablerosReordenados);
        setUsuario(usuarioActualizado);
    }

    const handleEliminarTablero = (tableroId) => {
        const usuarioActualizado = eliminarTablero(tableroId);
        setUsuario(usuarioActualizado);
    }

    const handleEditarTablero = (tableroId, nuevoTitulo, nuevoColor) => {
        const usuarioActualizado = editarTablero(tableroId, nuevoTitulo, nuevoColor);
        setUsuario(usuarioActualizado);
    }

    const handleEditarColumna = (tableroId, columnaId, nuevoTitulo, nuevoColor) => {
        const usuarioActualizado = editarColumna(tableroId, columnaId, nuevoTitulo, nuevoColor);
        setUsuario(usuarioActualizado);
    }

    const handleEliminarColumna = (tableroId, columnaId) => {
        const usuarioActualizado = eliminarColumna(tableroId, columnaId);
        setUsuario(usuarioActualizado);
    }

    const handleAgregarColumna = (tableroId, titulo, color) => {
        const usuarioActualizado = agregarColumna(tableroId, titulo, color);
        setUsuario(usuarioActualizado);
    }

    const handleReordenarColumnas = (tableroId, columnasReordenadas) => {
        const usuarioActualizado = reordenarColumnas(tableroId, columnasReordenadas);
        setUsuario(usuarioActualizado);
    }

    const handleAgregarTarea = (tableroId, columnaId, titulo, descripcion, fechaLimite, color) => {
        const usuarioActualizado = agregarTarea(tableroId, columnaId, titulo, descripcion, fechaLimite, color);
        setUsuario(usuarioActualizado);
    }

    const handleEditarTarea = (tableroId, columnaId, tareaId, nuevoTitulo, nuevaDescripcion, nuevaFechaLimite, nuevoColor) => {
        const usuarioActualizado = editarTarea(tableroId, columnaId, tareaId, nuevoTitulo, nuevaDescripcion, nuevaFechaLimite, nuevoColor);
        setUsuario(usuarioActualizado);
    }

    const handleEliminarTarea = (tableroId, columnaId, tareaId) => {
        const usuarioActualizado = eliminarTarea(tableroId, columnaId, tareaId);
        setUsuario(usuarioActualizado);
    }

    const handleReordenarTareas = (tableroId, columnaId, tareasReordenadas) => {
        const usuarioActualizado = reordenarTareas(tableroId, columnaId, tareasReordenadas);
        setUsuario(usuarioActualizado);
    }

    const handleMoverTarea = (tableroId, columnaOrigenId, columnaDestinoId, tareaId, nuevaPosicion) => {
        const usuarioActualizado = moverTarea(tableroId, columnaOrigenId, columnaDestinoId, tareaId, nuevaPosicion);
        setUsuario(usuarioActualizado);
    }

    return (
        <UserContext.Provider value={{
            usuario,
            theme,
            handleActualizarNombre,
            handleActualizarTema,
            handleResetCuenta,
            handleAgregarTablero,
            handleReordenarTableros,
            handleEliminarTablero,
            handleEditarTablero,
            handleEditarColumna,
            handleEliminarColumna,
            handleAgregarColumna,
            handleReordenarColumnas,
            handleAgregarTarea,
            handleEditarTarea,
            handleEliminarTarea,
            handleReordenarTareas,
            handleMoverTarea
        }}>
            {children}
        </UserContext.Provider>
    )
}