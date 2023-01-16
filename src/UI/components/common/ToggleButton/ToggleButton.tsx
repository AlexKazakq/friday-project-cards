import React, { useState } from 'react'

import ToggleButton from '@mui/material/ToggleButton'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'

type SupperButtonPropsType = {
  firstValue: string
  secondValue: string
  isMyPacks: boolean
  showMyOrAllPacks: (isMyPacks: boolean) => void
}
export const SupperToggleButton = ({
  firstValue,
  secondValue,
  isMyPacks,
  showMyOrAllPacks,
}: SupperButtonPropsType) => {
  const [alignment, setAlignment] = useState(isMyPacks === false ? secondValue : firstValue)
  const handleChange = (event: React.MouseEvent<HTMLElement>, newAlignment: string) => {
    setAlignment(newAlignment)
    newAlignment === 'My' ? showMyOrAllPacks(true) : showMyOrAllPacks(false)
  }

  return (
    <ToggleButtonGroup
      color="primary"
      value={alignment}
      exclusive
      onChange={handleChange}
      aria-label="Platform"
    >
      <ToggleButton
        size={'small'}
        value={firstValue}
        sx={{ width: '80px' }}
        disabled={alignment === 'My'}
      >
        {firstValue}
      </ToggleButton>
      <ToggleButton
        size={'small'}
        value={secondValue}
        sx={{ width: '80px' }}
        disabled={alignment !== 'My'}
      >
        {secondValue}
      </ToggleButton>
    </ToggleButtonGroup>
  )
}
