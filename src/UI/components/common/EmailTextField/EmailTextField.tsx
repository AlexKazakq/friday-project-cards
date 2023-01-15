import React from 'react'

import FormControl from '@mui/material/FormControl'
import TextField from '@mui/material/TextField'
import { FieldInputProps } from 'formik'

import s from './EmailTextField.module.css'

type EmailTextFieldType = {
  emailErrors: string | undefined
  emailTouched: boolean | undefined
  getFieldProps: FieldInputProps<string>
}

export const EmailTextField = (props: EmailTextFieldType) => {
  return (
    <FormControl className={s.emailContainer}>
      {props.emailErrors && props.emailTouched ? (
        <TextField
          {...props.getFieldProps}
          error
          label="Email"
          variant="standard"
          helperText={props.emailErrors}
        />
      ) : (
        <TextField label="Email" margin="normal" variant="standard" {...props.getFieldProps} />
      )}
    </FormControl>
  )
}
