import * as React from 'react'
import { ChangeEvent, useState } from 'react'

import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'

import { addNewPackTC } from '../../../../bll/store/packs-reducer'
import { useAppDispatch } from '../../../../hooks/hooks'
import { SuperCheckbox } from '../../common/SuperCheckbox/SuperCheckbox'
import { BasicModal } from '../BasicModal'

export const AddPackModal = () => {
  const dispatch = useAppDispatch()
  const [newPackName, setNewPackName] = useState('')
  const [privacy, setPrivacy] = useState(false)

  const onInputHandler = (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    debugger
    setNewPackName(e.currentTarget.value)
  }
  const onButtonClickHandler = () => {
    debugger
    dispatch(addNewPackTC({ cardsPack: { name: newPackName, private: privacy } }))
  }

  return (
    <BasicModal
      name={'Add new pack'}
      confirmButtonName={'Add new Pack'}
      onClickConfirmHandler={onButtonClickHandler}
    >
      <Typography id="modal-modal-description" sx={{ mt: 2 }}>
        {/*<SuperInputText onInput={onInputHandler} />*/}
        <TextField onChange={onInputHandler} fullWidth label="Name pack" variant="standard" />
        <SuperCheckbox onChange={() => setPrivacy(!privacy)}>Private pack </SuperCheckbox>
      </Typography>
    </BasicModal>
  )
}
