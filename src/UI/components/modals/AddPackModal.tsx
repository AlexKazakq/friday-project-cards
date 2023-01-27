import * as React from 'react'
import { FormEvent, useState } from 'react'

import Typography from '@mui/material/Typography'

import { addNewPackTC } from '../../../bll/store/packs-reducer'
import { useAppDispatch } from '../../../hooks/hooks'
import { SuperCheckbox } from '../common/SuperCheckbox/SuperCheckbox'
import SuperInputText from '../common/SuperInputText/SuperInputText'

import { BasicModal } from './BasicModal'

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
}

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
