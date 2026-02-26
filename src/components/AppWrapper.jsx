import { Theme } from '@radix-ui/themes'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from '../routes/Home'
import BoardDetail from '../routes/BoardDetail'
import { UserProvider, useUser } from '../context/UserContext'

const AppContent = () => {
  const { theme } = useUser();
  return (
    <Theme appearance={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/board/:id" element={<BoardDetail />} />
        </Routes>
      </BrowserRouter>
    </Theme>
  )
}

export const AppWrapper = () => {
  return (
    <UserProvider>
      <AppContent />
    </UserProvider>
  )
}
