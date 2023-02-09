import * as React from 'react'
import { ChangeEvent, FC, useState } from 'react'

import EditIcon from '@mui/icons-material/Edit'
import TextField from '@mui/material/TextField'
import Tooltip from '@mui/material/Tooltip/Tooltip'
import Typography from '@mui/material/Typography'

import { updatePackTC } from '../../../../bll/store/packs-reducer'
import { useAppDispatch } from '../../../../hooks/hooks'
import { SuperCheckbox } from '../../common/SuperCheckbox/SuperCheckbox'
import { BasicModal } from '../BasicModal'

type PropsType = {
  packId: string
  packName: string
}

export const UpdatePackModal: FC<PropsType> = ({ packId, packName }) => {
  const dispatch = useAppDispatch()
  const [name, setName] = useState(packName)
  const [privacy, setPrivacy] = useState(false)

  const onInputHandler = (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
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
      headerText={'Edit packs'}
      name={
        <Tooltip title="Edit packs">
          <EditIcon />
        </Tooltip>
      }
      confirmButtonName={'Save'}
      onClickConfirmHandler={onButtonClickHandler}
    >
      <Typography id="modal-modal-description" sx={{ mt: 2 }}>
        <TextField
          value={name}
          onChange={onInputHandler}
          variant="standard"
          fullWidth
          label="Name pack"
        />
        <SuperCheckbox onChange={() => setPrivacy(!privacy)}>Private pack </SuperCheckbox>
      </Typography>
    </BasicModal>
  )
}
