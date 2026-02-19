import { useState } from 'react'
import { Theme } from '@radix-ui/themes'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from '../routes/Home'
import BoardDetail from '../routes/BoardDetail'

export const AppWrapper = () => {

    const [theme, setTheme] = useState("dark")

    const toggleTheme = () => {
        setTheme(theme === "dark" ? "light" : "dark")
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
