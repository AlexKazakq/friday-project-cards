import React, { ChangeEvent, ChangeEventHandler, useEffect, useState } from 'react'

import BorderColorIcon from '@mui/icons-material/BorderColor'
import { Input, InputLabel } from '@mui/material'
import Button from '@mui/material/Button'

import s from '../Profile/profileName.module.css'

type ProfileNameType = {
  nickname: string
  updateNickname: (name: string) => void
}

export const ProfileName = (props: ProfileNameType) => {
  const [editMode, setEditMode] = useState<boolean>(false)
  const [nickname, setNickname] = useState<string>(props.nickname)
  const [newNickname, setNewNickname] = useState<string>(props.nickname)

  useEffect(() => {
    setNickname(props.nickname)
  }, [props.nickname])

  const activateEditMode = () => {
    setEditMode(true)
    setNickname(newNickname)
  }

  const deactivateEditMode = () => {
    setEditMode(false)
    // props.updateName(name)
  }

  const onNameChange = (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setNickname(e.currentTarget.value)
  }
  const onNewNameSave = () => {
    setNewNickname(nickname)
    deactivateEditMode()
  }

  return (
    <div>
      {!editMode && (
        <div>
          <span onDoubleClick={activateEditMode} className={s.nickname}>
            {newNickname}{' '}
          </span>
          <BorderColorIcon onClick={activateEditMode} fontSize="small" />
        </div>
      )}
      {editMode && (
        <div>
          <Input
            autoFocus={true}
            value={nickname}
            onChange={onNameChange}
            id="standard-basic"
            endAdornment={
              <Button
                variant={'contained'}
                color={'primary'}
                onClick={onNewNameSave}
                style={{ height: '24px', fontSize: '12px' }}
              >
                Save
              </Button>
            }
          />
        </div>
      )}
    </div>
  )
}
