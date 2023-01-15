import React, { useState } from 'react'

import ToggleButton from '@mui/material/ToggleButton'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'

type SupperButtonPropsType = {
  firstValue: string
  secondValue: string
}
export const SupperToggleButton = ({ firstValue, secondValue }: SupperButtonPropsType) => {
  const [alignment, setAlignment] = useState(firstValue)

  const handleChange = (event: React.MouseEvent<HTMLElement>, newAlignment: string) => {
    setAlignment(newAlignment)
  }

  return (
    <ToggleButtonGroup
      color="primary"
      value={alignment}
      exclusive
      onChange={handleChange}
      aria-label="Platform"
    >
      <ToggleButton size={'small'} value={firstValue} sx={{ width: '80px' }}>
        {firstValue}
      </ToggleButton>
      <ToggleButton size={'small'} value={secondValue} sx={{ width: '80px' }}>
        {secondValue}
      </ToggleButton>
    </ToggleButtonGroup>
  )
}
