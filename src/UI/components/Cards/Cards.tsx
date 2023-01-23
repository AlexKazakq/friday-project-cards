import React, { useEffect, useState } from 'react'

import { NavLink } from 'react-router-dom'

import { CardsParamsType } from '../../../api/cards-api'
import { PATH } from '../../../assets/Routes/path'
import {
  cardsSelector,
  cardsTotalCountSelector,
  packUserDataSelector,
  profileInfoSelector,
} from '../../../bll/selectors/selectors'
import { setCardsWithParamsTC } from '../../../bll/store/cards-reducer'
import { useAppDispatch, useAppSelector } from '../../../hooks/hooks'
import { useDebounce } from '../../../hooks/useDebounce'
import tableStyle from '../../styles/table.module.css'
import { SearchInput } from '../common/SearchInput/SearchInput'
import { TableHeader } from '../common/TableHeader/TableHeader'

import s from './cards.module.css'
import { CardsList } from './CardsList/CardsList'

export const Cards = () => {
  const cards = useAppSelector(cardsSelector)
  const profile = useAppSelector(profileInfoSelector)
  const packUserData = useAppSelector(packUserDataSelector)
  const cardsTotalCount = useAppSelector(cardsTotalCountSelector)

  const [params, setParams] = useState<CardsParamsType>({ cardsPack_id: packUserData.packId })
  const [cardQuestionName, setCardQuestionName] = useState<string>('')
  const [cardAnswerName, setCardAnswerName] = useState<string>('')
  const [cardsPerPage, setCardsPerPage] = useState<number>(4)
  const [page, setPage] = useState<number>(0)
  const [sort, setSort] = useState<string>('')

  const debouncedValue = useDebounce<CardsParamsType>(params, 500)
  const dispatch = useAppDispatch()
  const title =
    profile._id === packUserData.packUserId ? 'My Pack' : `${packUserData.packUserName}'s Pack`
  const buttonTitle = profile._id === packUserData.packUserId ? 'Add new pack' : 'Learn to pack'

  useEffect(() => {
    if (packUserData.packId) {
      dispatch(setCardsWithParamsTC({ ...params, cardsPack_id: packUserData.packId }))
    }
  }, [debouncedValue])

  const ChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCardsPerPage(+event.target.value)
    setPage(0)
    setParams({ ...params, pageCount: +event.target.value })
  }

  const changePage = (event: unknown, newPage: number) => {
    setPage(newPage)
    setParams({
      ...params,
      page: newPage + 1,
      pageCount:
        cardsTotalCount - (newPage + 1) * cardsPerPage > 0
          ? cardsPerPage
          : cardsTotalCount - newPage * cardsPerPage,
    })
  }

  let SearchByCardQuestion = (name: string) => {
    setPage(0)
    setCardQuestionName(name)
    setParams({ ...params, cardQuestion: name })
  }

  let SearchByCardAnswer = (name: string) => {
    setCardAnswerName(name)
    setParams({ ...params, cardAnswer: name })
  }

  const onChangeSort = (newSort: string) => {
    setSort(newSort)
    changePage(null, 0)
    setParams({ ...params, sortCards: newSort })
  }

  return (
    <div className={tableStyle.wrapper}>
      <div>
        <NavLink to={PATH.PACKS} className={s.back}>
          Back to Packs List
        </NavLink>
      </div>
      <TableHeader
        title={title}
        buttonName={buttonTitle}
        disable={cards.length === 0 && profile._id !== packUserData.packUserId}
      />
      {packUserData.cardsCount !== 0 && (
        <div className={s.filters}>
          <div className={s.items}>
            <SearchInput
              inputName={'Search by Question'}
              searchName={cardQuestionName}
              setParamName={SearchByCardQuestion}
            />
          </div>
          <div className={s.items}>
            <SearchInput
              inputName={'Search by Answer'}
              searchName={cardAnswerName}
              setParamName={SearchByCardAnswer}
            />
          </div>
        </div>
      )}
      <CardsList
        page={page}
        changePage={changePage}
        cardsPerPage={cardsPerPage}
        handleChangeRowsPerPage={ChangeRowsPerPage}
        sort={sort}
        onChangeSort={onChangeSort}
      />
    </div>
  )
}
