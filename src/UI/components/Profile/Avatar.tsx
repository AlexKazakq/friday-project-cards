import * as React from 'react'

import Avatar from '@mui/material/Avatar'
import Badge from '@mui/material/Badge'
import Stack from '@mui/material/Stack'
import { styled } from '@mui/material/styles'

import smallAvatarIcon from '../../../assets/images/camera.png'

import s from './avatar.module.css'

export type propsType = {
  name: string
  avatar?: string
}

const SmallAvatar = styled(Avatar)(({ theme }) => ({
  width: 32,
  height: 32,
  backgroundColor: '#a4a4a4',
  margin: 5,
  border: `2px solid ${theme.palette.background.paper}`,
}))

export const AvatarImg = (props: propsType) => {
  let firstLetterOfName = props.name.substr(0, 1).toUpperCase()

  return (
    <Avatar src={props.avatar} sx={{ width: '100%', height: '100%', fontSize: '100%' }}>
      {firstLetterOfName}
    </Avatar>
  )
}
export default function BadgeAvatars(props: propsType) {
  return (
    <Stack direction="row" spacing={2}>
      <Badge
        overlap="circular"
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        badgeContent={<SmallAvatar src={smallAvatarIcon} />}
      >
        <div className={s.avatarImg}>
          <AvatarImg name={props.name} avatar={props.avatar} />
        </div>
      </Badge>
    </Stack>
  )
}
