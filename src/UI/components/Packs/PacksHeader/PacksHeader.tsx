import React from 'react'

import SuperButton from '../../common/SuperButton/SuperButton'

import s from './packsHeader.module.css'

export const PacksHeader = () => {
  return (
    <div className={s.wrapper}>
      <span className={s.title}>Packs list</span>
      <SuperButton>Add new pack</SuperButton>
    </div>
  )
}
