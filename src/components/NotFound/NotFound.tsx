import React from 'react'

import error404 from '../../assets/images/404.svg'

import s from './NotFound.module.scss'
export const NotFound = () => {
  return (
    <div className={s.block}>
      <div className={s.img}>
        <img src={error404} />
      </div>
    </div>
  )
}
