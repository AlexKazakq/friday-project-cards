import React from 'react'

import { Button, FormControl, Grid, TextField } from '@mui/material'
import { useFormik } from 'formik'

// eslint-disable-next-line import/no-unresolved
import styleForm from './../../styles/form.module.css'
export const NewPassword = () => {
  const formik = useFormik({
    initialValues: {
      password: '',
    },
    onSubmit: values => {
      alert(JSON.stringify(values))
      window.location.href = '/friday-project-cards/profile'
    },
  })

  return (
    <Grid container justifyContent={'center'}>
      <Grid item justifyContent={'center'}>
        <form onSubmit={formik.handleSubmit} className={styleForm.form}>
          <FormControl>
            <h3>Create new password</h3>
            <TextField
              type="password"
              id="standard-basic"
              label="Password"
              variant="standard"
              {...formik.getFieldProps('password')}
            />
            <p>Create new password and we will send you further instructions to email</p>
            <Button type={'submit'} variant={'contained'} color={'primary'}>
              Create new password
            </Button>
          </FormControl>
        </form>
      </Grid>
    </Grid>
  )
}
