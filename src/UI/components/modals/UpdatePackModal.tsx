import * as React from 'react'
import { FC, FormEvent, useState } from 'react'

import EditIcon from '@mui/icons-material/Edit'
import Typography from '@mui/material/Typography'

import { updatePackTC } from '../../../bll/store/packs-reducer'
import { useAppDispatch } from '../../../hooks/hooks'
import SuperButton from '../common/SuperButton/SuperButton'
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

type PropsType = {
  packId: string
  packName: string
}

export const UpdatePackModal: FC<PropsType> = ({ packId, packName }) => {
  const dispatch = useAppDispatch()
  const [open, setOpen] = React.useState(true)
  const [name, setName] = useState(packName)
  const [privacy, setPrivacy] = useState(false)

  const onInputHandler = (e: FormEvent<HTMLInputElement>) => {
    setName(e.currentTarget.value)
  }
  const onButtonClickHandler = () => {
    dispatch(
      updatePackTC({
        cardsPack: {
          _id: packId,
          name,
        },
      })
    )
  }

  return (
    <BasicModal
      name={<EditIcon />}
      confirmButtonName={'Save'}
      onClickConfirmHandler={onButtonClickHandler}
    >
      <Typography id="modal-modal-title" variant="h6" component="h2">
        Edit pack
      </Typography>
      <Typography id="modal-modal-description" sx={{ mt: 2 }}>
        <SuperInputText value={name} onChange={onInputHandler} />
        <SuperCheckbox onChange={() => setPrivacy(!privacy)}>Private pack </SuperCheckbox>
      </Typography>
    </BasicModal>
  )
}
