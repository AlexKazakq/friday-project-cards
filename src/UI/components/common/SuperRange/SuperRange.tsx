import React from 'react'

import Slider, { SliderProps } from '@mui/material/Slider'

const SuperRange: React.FC<SliderProps> = props => {
  return (
    <Slider
      max={props.max}
      sx={{
        width: '200px',
        color: '#0066cc',
        marginTop: '30px',
        '& .MuiSlider-thumb': {
          height: 24,
          width: 24,
          backgroundColor: '#fff',
          border: '2px solid currentColor',
          '&:focus, &:hover, &.Mui-active, &.Mui-focusVisible': {
            boxShadow: 'inherit',
          },
          '&:before': {
            display: 'none',
          },
        },
        '& .MuiSlider-rail': {
          opacity: 0.8,
          backgroundColor: 'gray',
          height: 0.1,
        },
        '& .MuiSlider-track': {
          height: 6,
        },
      }}
      {...props}
    />
  )
}

export default SuperRange
