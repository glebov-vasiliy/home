import React, { FC, useCallback, useState } from 'react'
import { Dialog, DialogTitle, List, ListItem, TextField, Button } from '@mui/material'
import { useDispatch } from 'react-redux'
import { loginAction } from '../../../store/actions'

export const Login: FC = () => {
  const dispatch = useDispatch()
  const [login, setLogin] = useState('')
  const [password, setPassword] = useState('')

  const handleChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const { type, value } = event.target
    if (type === 'text') setLogin(value)
    if (type === 'password') setPassword(value)
  }, [])

  const handleClick = useCallback(() => {
    dispatch(loginAction.request({ login, password }))
  }, [dispatch, login, password])

  return (
    <Dialog open={true}>
      <DialogTitle sx={{ textAlign: 'center' }}>Authorization</DialogTitle>
      <List sx={{ pt: 0 }}>
        <ListItem>
          <TextField label="Login" type="text" onChange={handleChange} />
        </ListItem>
        <ListItem>
          <TextField label="Password" type="password" onChange={handleChange} />
        </ListItem>
        <ListItem>
          <Button variant="outlined" fullWidth={true} size="large" onClick={handleClick}>
            login
          </Button>
        </ListItem>
      </List>
    </Dialog>
  )
}
