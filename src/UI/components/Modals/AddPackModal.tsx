import * as React from 'react'
import { FormEvent, useState } from 'react'

import Typography from '@mui/material/Typography'

import { addNewPackTC } from '../../../bll/store/packs-reducer'
import { useAppDispatch } from '../../../hooks/hooks'
import { SuperCheckbox } from '../common/SuperCheckbox/SuperCheckbox'
import SuperInputText from '../common/SuperInputText/SuperInputText'

import { BasicModal } from './BasicModal'

export const AddPackModal = () => {
  const dispatch = useAppDispatch()
  const [newPackName, setNewPackName] = useState('')
  const [privacy, setPrivacy] = useState(false)

  const onInputHandler = (e: FormEvent<HTMLInputElement>) => {
    setNewPackName(e.currentTarget.value)
  }
  const onButtonClickHandler = () => {
    dispatch(addNewPackTC({ cardsPack: { name: newPackName, private: privacy } }))
  }

  return (
    <BasicModal
      name={'Add new pack'}
      confirmButtonName={'Add new Pack'}
      onClickConfirmHandler={onButtonClickHandler}
    >
      <Typography id="modal-modal-title" variant="h6" component="h2">
        Add new pack
      </Typography>
      <Typography id="modal-modal-description" sx={{ mt: 2 }}>
        <SuperInputText onInput={onInputHandler} />
        <SuperCheckbox onChange={() => setPrivacy(!privacy)}>Private pack </SuperCheckbox>
      </Typography>
    </BasicModal>
  )
}
