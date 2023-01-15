import React from 'react'

import SuperButton from '../../common/SuperButton/SuperButton'

import s from './packsHeader.module.css'

export const PacksHeader = () => {
  const onClickHandler = () => {}

  return (
    <div className={s.wrapper}>
      <span className={s.title}>Packs list</span>
      <SuperButton onClick={onClickHandler}>Add new pack</SuperButton>
    </div>
  )
}
