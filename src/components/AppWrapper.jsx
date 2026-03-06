import { Box, Flex, Theme } from '@radix-ui/themes'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from '../routes/Home'
import BoardDetail from '../routes/BoardDetail'
import { UserProvider, useUser } from '../context/UserContext'
import { Footer } from './Footer'

const AppContent = () => {
  const { theme } = useUser();
  return (
    <Theme appearance={theme} accentColor={theme === 'dark' ? 'teal' : 'red'} grayColor='gray'>
      <BrowserRouter>
        <Flex direction="column" minHeight="100vh">
          <Box flexGrow="1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/board/:id" element={<BoardDetail />} />
            </Routes>
          </Box>
          <Footer />
        </Flex>
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
