import React, { FC, useEffect } from 'react'
import { MenuAppBar } from './components/MenuAppBar'
import { TabPanel } from './components/TabPanel'
import { CircularIndeterminate } from './components/CircularIndeterminate'
import { authSelector, initSelector } from '../store/root/selectors'
import { useSelector } from 'react-redux'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Box } from '@mui/material'
import { Login } from './components/Login'

const App: FC = () => {
  const isInit = useSelector(initSelector)
  const isAuth = useSelector(authSelector)

  if (!isAuth) return <Login />

  if (!isInit)
    return (
      <Box
        sx={{ height: '100vh', width: '100%', display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}
      >
        <CircularIndeterminate />
      </Box>
    )

  return (
    <>
      <MenuAppBar />
      <TabPanel />
      <ToastContainer position="bottom-center" />
    </>
  )
}

export default App
