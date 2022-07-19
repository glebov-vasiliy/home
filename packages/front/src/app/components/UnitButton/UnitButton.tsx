import React, { FC, useCallback } from 'react'
import { Box, Button } from '@mui/material'
import { useDispatch } from 'react-redux'
import { changeLightUnitAction } from '../../../store/root/actions'
import { RequestStateEnum } from '../../../enums'
import { Unit } from '../../../store/appSlice/types/appState'

export const UnitButton: FC<Unit> = ({ id, name, isEnabled, requestState }) => {
  const dispatch = useDispatch()

  const background =
    requestState === RequestStateEnum.LOADING
      ? 'rgba(241,232,133,0.3)'
      : isEnabled
      ? 'rgba(241,232,133,0.9)'
      : 'rgba(0,0,0,0)'

  const sxButton = {
    width: '99%',
    height: 60,
    background,
    '&:hover': { background },
  }

  const handleClick = useCallback(() => {
    if (requestState === RequestStateEnum.LOADING) return
    dispatch(changeLightUnitAction.request({ id, isEnabled: !isEnabled }))
  }, [dispatch, id, isEnabled, requestState])

  return (
    <Box>
      <Button variant="outlined" sx={sxButton} onClick={handleClick}>
        {name}
      </Button>
    </Box>
  )
}
