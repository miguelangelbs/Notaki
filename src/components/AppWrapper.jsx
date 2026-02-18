import { useState } from 'react'
import { Theme } from '@radix-ui/themes'
import App from '../App'


export const AppWrapper = () => {

    const [theme, setTheme] = useState("dark")

    const toggleTheme = () => {
        setTheme(theme === "dark" ? "light" : "dark")
    }

  return (
    <Theme appearance={theme}>
        <App theme={theme} toggleTheme={toggleTheme}/>
    </Theme>
  )
}
