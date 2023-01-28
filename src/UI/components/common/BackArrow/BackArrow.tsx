import React from 'react'

import { NavLink } from 'react-router-dom'

import { PATH } from '../../../../assets/Routes/path'

import s from './BackArrow.module.css'

export const BackArrow = () => {
  return (
    <div>
      <NavLink to={PATH.PACKS} className={s.back}>
        Back to Packs List
      </NavLink>
    </div>
  )
}
