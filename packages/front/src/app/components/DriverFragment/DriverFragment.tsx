import React, { FC } from 'react'
import { UnitButton } from '../UnitButton'
import { Box } from '@mui/material'
import { useSelector } from 'react-redux'
import { driverUnitsSelector } from '../../../store/selectors'

export const DriverFragment: FC = () => {
  const lightUnits = useSelector(driverUnitsSelector)
  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gridRowGap: '1em', gridColumnGap: '1em' }}>
      {lightUnits.map(({ id, name, isEnabled, loadingState }) => (
        <UnitButton key={id} id={id} name={name} isEnabled={isEnabled} loadingState={loadingState} />
      ))}
    </Box>
  )
}
