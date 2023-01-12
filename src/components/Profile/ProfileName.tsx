import React, { ChangeEvent, KeyboardEvent, useEffect, useState } from 'react'

import BorderColorIcon from '@mui/icons-material/BorderColor'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'

import s from '../Profile/profileName.module.css'

type ProfileNameType = {
  nickname: string
  updateNickname: (name: string) => void
}

export const ProfileName = (props: ProfileNameType) => {
  const [editMode, setEditMode] = useState<boolean>(false)
  const [nickname, setNickname] = useState<string>(props.nickname)
  const [newNickname, setNewNickname] = useState<string>(nickname)

  useEffect(() => {
    setNickname(props.nickname)
    setNewNickname(props.nickname)
  }, [props.nickname])

  const activateEditMode = () => {
    setEditMode(true)
  }

  const deactivateEditMode = () => {
    setEditMode(false)
    setNickname(newNickname)
  }

  const onNameChange = (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setNickname(e.currentTarget.value)
  }

  const editName = () => {
    setNewNickname(nickname)
    setEditMode(false)
    props.updateNickname(nickname)
  }

  const onKeyHandler = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      deactivateEditMode()
    } else if (e.key === 'Enter') {
      debugger
      console.log('enter')
      e.preventDefault()
      editName()
    }
  }

  return (
    <div>
      {!editMode && (
        <div>
          <span onDoubleClick={activateEditMode} className={s.nickname}>
            {nickname}
          </span>
          <BorderColorIcon onClick={activateEditMode} fontSize="small" />
        </div>
      )}
      {editMode && (
        <div>
          <TextField
            required={true}
            onKeyUp={onKeyHandler}
            autoFocus={true}
            value={nickname}
            label="nickname"
            onChange={onNameChange}
            variant="standard"
            InputProps={{
              endAdornment: (
                <Button
                  variant={'contained'}
                  color={'primary'}
                  onClick={editName}
                  style={{ height: '24px', fontSize: '12px' }}
                  disabled={nickname.length === 0}
                >
                  Save
                </Button>
              ),
            }}
          />
        </div>
      )}
    </div>
  )
}
