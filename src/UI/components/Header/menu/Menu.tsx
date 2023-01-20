import React from 'react'

import Button from '@mui/material/Button'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import { useNavigate } from 'react-router-dom'

import { PATH } from '../../../../assets/Routes/path'
import { profileInfoSelector } from '../../../../bll/selectors/selectors'
import { logoutTC } from '../../../../bll/store/auth-reducer'
import { useAppDispatch, useAppSelector } from '../../../../hooks/hooks'
import { AvatarImg } from '../../Profile/Avatar'

import s from './../header.module.css'

export function MenuHeader() {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const profileInfo = useAppSelector(profileInfoSelector)

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  const OnClickMenuItemProfile = () => {
    navigate(PATH.PROFILE)
    handleClose()
  }

  const OnClickMenuItemLogout = () => {
    dispatch(logoutTC())
    handleClose()
  }

  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        <div>
          <div className={s.headerName}> {profileInfo.name}</div>
          <div className={s.headerAvatar}>
            <AvatarImg name={profileInfo.name} avatar={profileInfo.avatar} />
          </div>
        </div>
      </Button>

      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={OnClickMenuItemProfile}>Profile</MenuItem>
        <MenuItem onClick={OnClickMenuItemLogout}>Logout</MenuItem>
      </Menu>
    </div>
  )
}
