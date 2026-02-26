import { useEffect, useState } from 'react'
import { Theme } from '@radix-ui/themes'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from '../routes/Home'
import BoardDetail from '../routes/BoardDetail'
import { actualizarPreferenciaTema, crearCuentaInvitado, obtenerIdInvitado, obtenerUsuarioInvitado } from '../services/userService'

export const AppWrapper = () => {

  //Comprueba si la cuenta local está creada, de no ser así se creará
  useEffect(() => {
    const idActual = obtenerIdInvitado()
    if (!idActual) {
      crearCuentaInvitado();
    }
  }, [])

  const [theme, setTheme] = useState(() => {
    const usuario = obtenerUsuarioInvitado()
    return usuario?.theme ?? "dark";
  });

  const toggleTheme = () => {
    const nuevoTema = theme === "dark" ? "light" : "dark";
    setTheme(nuevoTema);
    actualizarPreferenciaTema(nuevoTema);
  }

  return (
    <Theme appearance={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home theme={theme} toggleTheme={toggleTheme} />} />
          <Route path="/board/:id" element={<BoardDetail theme={theme} toggleTheme={toggleTheme} />} />
        </Routes>
      </BrowserRouter>
    </Theme>
  )
}
