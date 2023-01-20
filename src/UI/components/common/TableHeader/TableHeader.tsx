import React from 'react'

import { addNewPackTC } from '../../../../bll/store/packs-reducer'
import { useAppDispatch } from '../../../../hooks/hooks'
import SuperButton from '../SuperButton/SuperButton'

import s from './packsHeader.module.css'

type PacksHeaderType = {
  title: string
  buttonName: string
}
export const TableHeader = ({ title, buttonName }: PacksHeaderType) => {
  const dispatch = useAppDispatch()
  const onClickHandler = () => {
    debugger
    console.log('added new pack')
    dispatch(
      addNewPackTC({
        cardsPack: {
          name: 'New pack for test1',
          deckCover: '',
          private: false,
        },
      })
    )
  }

  return (
    <div className={s.wrapper}>
      <span className={s.title}>{title}</span>
      <SuperButton onClick={onClickHandler} className={s.button}>
        {buttonName}
      </SuperButton>
    </div>
  )
}
