import React, { ChangeEvent, ChangeEventHandler, useEffect, useState, KeyboardEvent } from 'react'

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
  const [error, setError] = useState<string>(props.nickname)

  useEffect(() => {
    setNickname(props.nickname)
  }, [props.nickname])

  const activateEditMode = () => {
    setEditMode(true)
  }

  const deactivateEditMode = () => {
    setEditMode(false)
    props.updateNickname(nickname)
  }

  const onNameChange = (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setNickname(e.currentTarget.value)
  }

  const onKeyEscHandler = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      setEditMode(false)
    } else if (e.key == 'Enter') {
      setEditMode(false)
    }
  }

  return (
    <div>
      {!editMode && (
        <div>
          <span onDoubleClick={activateEditMode} className={s.nickname}>
            {nickname}{' '}
          </span>
          <BorderColorIcon onClick={activateEditMode} fontSize="small" />
        </div>
      )}
      {editMode && (
        <div>
          <Input
            onKeyUp={onKeyEscHandler}
            autoFocus={true}
            value={nickname}
            onChange={onNameChange}
            id="standard-basic"
            endAdornment={
              <Button
                variant={'contained'}
                color={'primary'}
                onClick={deactivateEditMode}
                style={{ height: '24px', fontSize: '12px' }}
                disabled={nickname.length === 0}
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
