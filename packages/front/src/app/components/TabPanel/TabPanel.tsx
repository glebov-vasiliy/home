import React, { FC } from 'react'
import Box from '@mui/material/Box'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import { TabItem } from './TabItem'
import { LightFragment } from '../LightFragment'
import { DriverFragment } from '../DriverFragment'

export const TabPanel: FC = () => {
  const [value, setValue] = React.useState(0)

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }
  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Light" />
          <Tab label="Сlimate" />
          <Tab label="Gates" />
        </Tabs>
      </Box>
      <TabItem value={value} index={0}>
        <LightFragment />
      </TabItem>
      <TabItem value={value} index={1}>
        Сlimate
      </TabItem>
      <TabItem value={value} index={2}>
        <DriverFragment />
      </TabItem>
    </Box>
  )
}
