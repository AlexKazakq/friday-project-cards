import React, { useEffect } from 'react'

import {
  cardPacksCountSelector,
  getMyIdSelector,
  pageCountPackSelector,
  pagePackSelector,
  searchPackSelector,
  sortPacksSelector,
} from '../../../bll/selectors/selectors'
import { setPacksTC, setSortPack } from '../../../bll/store/packs-reducer'
import { useAppDispatch, useAppSelector } from '../../../hooks/hooks'
import s from '../../styles/table.module.css'
import { TableHeader } from '../common/TableHeader/TableHeader'
import { AddPackModal } from '../Modals/AddPackModal'

import { PacksList } from './PacksList/PacksList'
import { PacksSetting } from './PacksSetting/PacksSetting'

export const Packs = () => {
  const cardsCount = useAppSelector(cardPacksCountSelector)
  const myId = useAppSelector(getMyIdSelector)
  const searchValue = useAppSelector(searchPackSelector)
  const pagePack = useAppSelector(pagePackSelector)
  const pageCountPack = useAppSelector(pageCountPackSelector)
  const sort = useAppSelector(sortPacksSelector)

  const dispatch = useAppDispatch()

  console.log('123')

  useEffect(() => {
    dispatch(setPacksTC())
  }, [cardsCount, myId, searchValue, pagePack, pageCountPack, sort])

  const onChangeSort = (newSort: string) => {
    dispatch(setSortPack({ sort: newSort }))
  }

  return (
    <div className={s.wrapper}>
      <TableHeader title={'Packs list'} buttonName={<AddPackModal />} />
      <PacksSetting />
      <PacksList sort={sort} onChangeSort={onChangeSort} />
    </div>
  )
}
