import { useState } from 'react'
import { Theme } from '@radix-ui/themes'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from '../routes/Home'
import BoardDetail from '../routes/BoardDetail'
import { actualizarPreferenciaTema, obtenerIdInvitado } from '../services/userService'

export const AppWrapper = () => {

    const [theme, setTheme] = useState(() => {
        const idActual = obtenerIdInvitado();
        const usuario = JSON.parse(localStorage.getItem(`usuario_${idActual}`));
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
