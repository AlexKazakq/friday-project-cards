import React from 'react'

import error404 from '../../../assets/images/404.svg'

import s from './Error404.module.scss'
export const Error404 = () => {
  return (
    <div className={s.block}>
      <div className={s.img}>
        <img src={error404} />
      </div>
    </div>
  )
}
