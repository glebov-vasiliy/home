import React, { FC, lazy, Suspense } from 'react'
import { MenuAppBar } from './components/MenuAppBar'
import { TabPanel } from './components/TabPanel'
import { CircularIndeterminate } from './components/CircularIndeterminate'
import { authSelector, initSelector, pageSelector } from '../store/root/selectors'
import { useSelector } from 'react-redux'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Login } from './components/Login'
const Profile = lazy(() => import('./components/Profile'))

const App: FC = () => {
  const isInit = useSelector(initSelector)
  const isAuth = useSelector(authSelector)
  const page = useSelector(pageSelector)

  if (!isAuth && isInit) return <Login />

  if (!isInit) return <CircularIndeterminate />

  if (page === 'profile') {
    return (
      <Suspense fallback={<CircularIndeterminate />}>
        <Profile />
      </Suspense>
    )
  }

  return (
    <>
      <MenuAppBar />
      <TabPanel />
      <ToastContainer position="bottom-center" />
    </>
  )
}

export default App
