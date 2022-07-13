import React, { FC } from 'react'
import { MenuAppBar } from './components/MenuAppBar'
import { TabPanel } from './components/TabPanel'
import { CircularIndeterminate } from './components/CircularIndeterminate'
import { initSelector } from '../store/selectors'
import { useSelector } from 'react-redux'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Box } from '@mui/material'

const App: FC = () => {
  const isInit = useSelector(initSelector)
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
