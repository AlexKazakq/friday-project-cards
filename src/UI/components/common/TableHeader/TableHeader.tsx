import React, { ReactNode } from 'react'

import { useAppDispatch } from '../../../../hooks/hooks'
import { AddPackModal } from '../../modals/AddPackModal'
import SuperButton from '../SuperButton/SuperButton'

import s from './packsHeader.module.css'

type PacksHeaderType = {
  title: string
  buttonName: ReactNode
  disable?: boolean
  onClick?: () => void
  cardsPack_id?: string | undefined
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
