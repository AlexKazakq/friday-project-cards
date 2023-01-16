import React from 'react'

import SuperButton from '../SuperButton/SuperButton'

import s from './packsHeader.module.css'

type PacksHeaderType = {
  title: string
  buttonName: string
}
export const TableHeader = ({ title, buttonName }: PacksHeaderType) => {
  const onClickHandler = () => {}

  return (
    <div className={s.wrapper}>
      <span className={s.title}>{title}</span>
      <SuperButton onClick={onClickHandler}>{buttonName}</SuperButton>
    </div>
  )
}
