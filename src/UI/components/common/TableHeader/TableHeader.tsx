import React, { ReactNode } from 'react'

import SuperButton from '../SuperButton/SuperButton'

import s from './packsHeader.module.css'

type PacksHeaderType = {
  title: string
  buttonName: ReactNode
  isNotButton?: boolean
  onClick?: () => void
}
export const TableHeader = ({ title, buttonName, isNotButton, onClick }: PacksHeaderType) => {
  return (
    <div className={s.wrapper}>
      <span className={s.title}>{title}</span>
      {!isNotButton && <SuperButton onClick={onClick}>{buttonName}</SuperButton>}
    </div>
  )
}
