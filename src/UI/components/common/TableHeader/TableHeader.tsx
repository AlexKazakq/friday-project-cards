import React from 'react'

import SuperButton from '../SuperButton/SuperButton'

import s from './packsHeader.module.css'

type PacksHeaderType = {
  title: string
  buttonName: string
  disable?: boolean
  onClick?: () => void
}
export const TableHeader = ({ title, buttonName, disable, onClick }: PacksHeaderType) => {
  return (
    <div className={s.wrapper}>
      <span className={s.title}>{title}</span>
      <SuperButton onClick={onClick} className={s.button} disabled={disable}>
        {buttonName}
      </SuperButton>
    </div>
  )
}
