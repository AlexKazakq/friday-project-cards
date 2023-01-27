import React, { ReactNode } from 'react'

import Button from '@mui/material/Button'

import { statusSelector } from '../../../../bll/selectors/selectors'
import { useAppSelector } from '../../../../hooks/hooks'
import styleForm from '../../../styles/form.module.css'

type ButtonFormType = {
  buttonName: string | ReactNode
}

export const ButtonForm = (props: ButtonFormType) => {
  const status = useAppSelector(statusSelector)

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
