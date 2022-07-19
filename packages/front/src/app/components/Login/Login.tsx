import React, { FC, useCallback, useEffect, useMemo, useState } from 'react'
import { Dialog, DialogTitle, List, ListItem, TextField, Button, FormControl, FormHelperText } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { loginAction } from '../../../store/root/actions'
import { requestSelector } from '../../../store/userSlice/selectors/userSelectors'
import { RequestStateEnum } from '../../../enums'

export const Login: FC = () => {
  const dispatch = useDispatch()
  const defValue = useMemo(() => ({ username: '', password: '' }), [])
  const [value, setValue] = useState(defValue)
  const [error, setError] = useState(defValue)
  const request = useSelector(requestSelector)

  useEffect(() => {
    if (request === RequestStateEnum.ERROR) {
      setError({ username: ' ', password: 'wrong login or password' })
    }
  }, [request])

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const { type, value } = event.target
      if (type === 'text') setValue((prevState) => ({ ...prevState, username: value }))
      if (type === 'password') setValue((prevState) => ({ ...prevState, password: value }))
      setError(defValue)
    },
    [defValue],
  )

  const handleClick = useCallback(() => {
    const { username, password } = value
    username.length && password.length && dispatch(loginAction.request({ username, password }))
    !username.length && setError((prevState) => ({ ...prevState, username: 'empty username' }))
    !password.length && setError((prevState) => ({ ...prevState, password: 'empty password' }))
  }, [value, dispatch])

  return (
    <Dialog open={true}>
      <DialogTitle sx={{ textAlign: 'center' }}>Authorization</DialogTitle>
      <List sx={{ pt: 0 }}>
        <ListItem>
          <FormControl>
            <TextField error={!!error.username} label="Username" type="text" onChange={handleChange} />
            <FormHelperText sx={{ color: 'red' }}>{error.username}&nbsp;</FormHelperText>
          </FormControl>
        </ListItem>
        <ListItem>
          <FormControl>
            <TextField error={!!error.password} label="Password" type="password" onChange={handleChange} />
            <FormHelperText sx={{ color: 'red' }}>{error.password}&nbsp;</FormHelperText>
          </FormControl>
        </ListItem>
        <ListItem>
          <Button
            variant="outlined"
            fullWidth={true}
            size="large"
            onClick={handleClick}
            disabled={request === RequestStateEnum.LOADING}
          >
            login
          </Button>
        </ListItem>
      </List>
    </Dialog>
  )
}
