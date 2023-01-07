import React from 'react'

import { Slider, SliderProps } from '@mui/material'

const SuperRange: React.FC<SliderProps> = props => {
  return (
    <Slider
      sx={{
        // стили для слайдера // пишет студент
        width: '300px',
        marginLeft: '50px',
        color: '#00CC22',
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
      {...props} // отдаём слайдеру пропсы если они есть (value например там внутри)
    />
  )
}

export default SuperRange
