import React, { FC } from 'react'
import { UnitButton } from '../UnitButton'
import { Box } from '@mui/material'
import { useSelector } from 'react-redux'
import { lightUnitsSelector } from '../../../store/root/selectors'

export const LightFragment: FC = () => {
  const lightUnits = useSelector(lightUnitsSelector)
  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gridRowGap: '1em', gridColumnGap: '1em' }}>
      {lightUnits.map(({ id, name, isEnabled, requestState }) => (
        <UnitButton key={id} id={id} name={name} isEnabled={isEnabled} requestState={requestState} />
      ))}
    </Box>
  )
}
