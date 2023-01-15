import React, { useState } from 'react'

import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import FormControl from '@mui/material/FormControl'
import IconButton from '@mui/material/IconButton'
import Input from '@mui/material/Input'
import InputAdornment from '@mui/material/InputAdornment'
import InputLabel from '@mui/material/InputLabel'
import { FieldInputProps } from 'formik'

import s from './PasswordTextField.module.css'

type PasswordTextFieldType = {
  passwordErrors: string | undefined
  passwordTouched: boolean | undefined
  getFieldProps: FieldInputProps<string>
  label: string
}

export const PasswordTextField = (props: PasswordTextFieldType) => {
  const [showPassword, setShowPassword] = useState(false)
  const handleClickShowPassword = () => setShowPassword(show => !show)
  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
  }

  return (
    <div>
      <FormControl sx={{ height: '80px' }} variant="standard" className={s.passwordContainer}>
        <InputLabel htmlFor="outlined-adornment-password">{props.label}</InputLabel>
        <Input
          type={showPassword ? 'text' : 'password'}
          {...props.getFieldProps}
          error={!!props.passwordErrors && !!props.passwordTouched}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
        />
        {props.passwordErrors && props.passwordTouched && (
          <span className={s.errorSpan}>{props.passwordErrors}</span>
        )}
      </FormControl>
    </div>
  )
}
