import React, { useState } from 'react'

import ToggleButton from '@mui/material/ToggleButton'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'

import { profileInfoSelector } from '../../../../bll/selectors/selectors'
import { useAppSelector } from '../../../../hooks/hooks'

type SupperButtonPropsType = {
  firstValue: string
  secondValue: string
  changeToggleButton: (userId: string) => void
}
export const SupperToggleButton = ({
  firstValue,
  secondValue,
  changeToggleButton,
}: SupperButtonPropsType) => {
  const profileInfo = useAppSelector(profileInfoSelector)
  const [alignment, setAlignment] = useState(secondValue)
  const handleChange = (event: React.MouseEvent<HTMLElement>, newAlignment: string) => {
    setAlignment(newAlignment)
    newAlignment === 'My' ? changeToggleButton(profileInfo._id) : changeToggleButton('')
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
