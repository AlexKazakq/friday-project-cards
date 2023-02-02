import * as React from 'react'
import { ChangeEvent, useState } from 'react'

import Avatar from '@mui/material/Avatar'
import Badge from '@mui/material/Badge'
import IconButton from '@mui/material/IconButton'
import Stack from '@mui/material/Stack'
import { styled } from '@mui/material/styles'

import smallAvatarIcon from '../../../assets/images/camera.png'

import s from './avatar.module.css'

export type propsType = {
  name: string
  avatar?: string
  updateAvatar: (file: string) => void
}

export type AvatarImgType = {
  name: string
  avatar?: string
}
export const SmallAvatar = styled(Avatar)(({ theme }) => ({
  width: 32,
  height: 32,
  backgroundColor: '#a4a4a4',
  margin: 5,
  border: `2px solid ${theme.palette.background.paper}`,
}))

export const AvatarImg = (props: AvatarImgType) => {
  let firstLetterOfName = props.name.substr(0, 1).toUpperCase()

  return (
    <Avatar src={props.avatar} sx={{ width: '100%', height: '100%', fontSize: '100%' }}>
      {firstLetterOfName}
    </Avatar>
  )
}
export default function BadgeAvatars(props: propsType) {
  const [ava, setAva] = useState(props.avatar)
  const uploadHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length) {
      const file = e.target.files[0]

      if (file.size < 4000000) {
        convertFileToBase64(file, (file64: string) => {
          setAva(file64)
          props.updateAvatar(file64)
        })
      } else {
        alert('Error: Файл слишком большого размера')
      }
    }
  }

  const convertFileToBase64 = (file: File, callBack: (value: string) => void) => {
    const reader = new FileReader()

    reader.onloadend = () => {
      const file64 = reader.result as string

      callBack(file64)
    }
    reader.readAsDataURL(file)
  }

  return (
    <Stack direction="row" spacing={2}>
      <Badge
        overlap="circular"
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        badgeContent={
          <label>
            <input type="file" onChange={uploadHandler} style={{ display: 'none' }} />
            <IconButton component="span">
              <SmallAvatar src={smallAvatarIcon} />
            </IconButton>
          </label>
        }
      >
        <div className={s.avatarImg}>
          <AvatarImg name={props.name} avatar={ava} />
        </div>
      </Badge>
    </Stack>
  )
}
