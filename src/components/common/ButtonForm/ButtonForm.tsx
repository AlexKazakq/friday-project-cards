import React from 'react'

import Button from '@mui/material/Button'

import { useAppSelector } from '../../../hooks/hooks'
import styleForm from '../../../styles/form.module.css'

type ButtonFormType = {
  buttonName: string
}

export const ButtonForm = (props: ButtonFormType) => {
  const status = useAppSelector(state => state.app.status)

  return (
    <div className={styleForm.buttonForm}>
      <Button
        type={'submit'}
        variant={'contained'}
        color={'primary'}
        disabled={status === 'loading'}
        className={styleForm.button}
      >
        {props.buttonName}
      </Button>
    </div>
  )
}
