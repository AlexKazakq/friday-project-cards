import React, { useEffect, useState } from 'react'

import { PacksParamsType } from '../../../api/packs-api'
import {
  cardPacksMaxCountSelector,
  cardPacksMinCountSelector,
  cardPacksTotalCountSelector,
  profileInfoSelector,
} from '../../../bll/selectors/selectors'
import { setPacksWithParamsTC } from '../../../bll/store/packs-reducer'
import { useAppDispatch, useAppSelector } from '../../../hooks/hooks'
import { useDebounce } from '../../../hooks/useDebounce'
import s from '../../styles/table.module.css'
import { TableHeader } from '../common/TableHeader/TableHeader'
import { AddPackModal } from '../modals/AddPackModal'

import { PacksList } from './PacksList/PacksList'
import { PacksSetting } from './PacksSetting/PacksSetting'

export const Packs = () => {
  const profileInfo = useAppSelector(profileInfoSelector)
  const cardPacksMaxCount = useAppSelector(cardPacksMaxCountSelector)
  const cardPacksMinCount = useAppSelector(cardPacksMinCountSelector)
  const cardPacksTotalCount = useAppSelector(cardPacksTotalCountSelector)

  const [isMyPacks, SetIsMyPacks] = useState<boolean>(false)
  const [packName, setPackName] = useState<string>('')
  const [params, setParams] = useState<PacksParamsType>({})
  const [minValue, setMinValue] = useState<number>(0)
  const [maxValue, setMaxValue] = useState<number>(0)
  const [cardsPerPage, setCardsPerPage] = useState<number>(4)
  const [page, setPage] = useState<number>(0)
  const [sort, setSort] = useState<string>('')

  const debouncedValue = useDebounce<PacksParamsType>(params, 500)

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(setPacksWithParamsTC({ ...params }))
  }, [debouncedValue])

  useEffect(() => {
    setMaxValue(cardPacksMaxCount)
    setMinValue(cardPacksMinCount)
  }, [cardPacksMaxCount, cardPacksMinCount])
  const ChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCardsPerPage(+event.target.value)
    setPage(0)
    setParams({ ...params, pageCount: +event.target.value })
  }

  const searchByPackName = (packName: string) => {
    setPackName(packName)
    setParams({ ...params, packName: packName })
  }

  const showMyOrAllPacks = (isMyPacks: boolean) => {
    SetIsMyPacks(isMyPacks)
    isMyPacks
      ? setParams({ ...params, user_id: profileInfo._id })
      : setParams({ ...params, user_id: undefined })
  }
  const clearFilter = () => {
    SetIsMyPacks(false)
    setPackName('')
    setMinValue(0)
    setMaxValue(cardPacksMaxCount)
    setParams({
      ...params,
      packName: undefined,
      user_id: undefined,
      min: undefined,
      max: undefined,
    })
  }

  const changeNumberOfCards = (event: Event, value: number | number[]) => {
    if (Array.isArray(value)) {
      let [a, b] = value

      setMinValue(a)
      setMaxValue(b)
      setParams({ ...params, min: a, max: b })
    } else {
      setMinValue(value)
    }
  }

  const onChangeSort = (newSort: string) => {
    setSort(newSort)
    changePage(null, 0)
    setParams({ ...params, sortPacks: newSort })
  }

  const changePage = (event: unknown, newPage: number) => {
    setPage(newPage)
    setParams({
      ...params,
      page: newPage + 1,
      pageCount:
        cardPacksTotalCount - (newPage + 1) * cardsPerPage > 0
          ? cardsPerPage
          : cardPacksTotalCount - newPage * cardsPerPage,
    })
  }

  return (
    <div className={s.wrapper}>
      <TableHeader title={'Packs list'} buttonName={<AddPackModal />} />
      <PacksSetting
        packName={packName}
        isMyPacks={isMyPacks}
        minValue={minValue}
        maxValue={maxValue}
        cardPacksMaxCount={cardPacksMaxCount}
        changeNumberOfCards={changeNumberOfCards}
        searchByPackName={searchByPackName}
        showMyOrAllPacks={showMyOrAllPacks}
        clearFilter={clearFilter}
      />
      <PacksList
        page={page}
        handleChangeRowsPerPage={ChangeRowsPerPage}
        cardsPerPage={cardsPerPage}
        changePage={changePage}
        sort={sort}
        onChangeSort={onChangeSort}
      />
    </div>
  )
}
