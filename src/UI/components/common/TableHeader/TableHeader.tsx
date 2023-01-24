import React from 'react'

import { useAppDispatch } from '../../../../hooks/hooks'
import { AddPackModal } from '../../modals/AddPackModal'

import s from './packsHeader.module.css'

type PacksHeaderType = {
  title: string
  buttonName: string
  cardsPack_id?: string | undefined
}
export const TableHeader = ({ title, buttonName, cardsPack_id }: PacksHeaderType) => {
  const dispatch = useAppDispatch()

  return (
    <div className={s.wrapper}>
      <span className={s.title}>{title}</span>
      <AddPackModal />
    </div>
  )
}
