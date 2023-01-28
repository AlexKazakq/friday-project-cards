import * as React from 'react'
import { FC, FormEvent, useState } from 'react'

import EditIcon from '@mui/icons-material/Edit'
import Tooltip from '@mui/material/Tooltip/Tooltip'
import Typography from '@mui/material/Typography'

import { updatePackTC } from '../../../bll/store/packs-reducer'
import { useAppDispatch } from '../../../hooks/hooks'
import { SuperCheckbox } from '../common/SuperCheckbox/SuperCheckbox'
import SuperInputText from '../common/SuperInputText/SuperInputText'

import { BasicModal } from './BasicModal'

type PropsType = {
  packId: string
  packName: string
}

export const UpdatePackModal: FC<PropsType> = ({ packId, packName }) => {
  const dispatch = useAppDispatch()
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
      name={
        <Tooltip title="Edit cards">
          <EditIcon />
        </Tooltip>
      }
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
