import React, { useEffect, useState } from 'react'

import { NavLink, useNavigate } from 'react-router-dom'

import { CardsParamsType } from '../../../api/cards-api'
import { PATH } from '../../../assets/Routes/path'
import {
  cardsSelector,
  cardsTotalCountSelector,
  packUserDataSelector,
  profileInfoSelector,
  searchCardsByAnswerSelector,
  searchCardsByQuestionSelector,
} from '../../../bll/selectors/selectors'
import {
  setCardsTC,
  setSearchCardsByAnswer,
  setSearchCardsByQuestion,
} from '../../../bll/store/cards-reducer'
import { useAppDispatch, useAppSelector } from '../../../hooks/hooks'
import tableStyle from '../../styles/table.module.css'
import { SearchInput } from '../common/SearchInput/SearchInput'
import { TableHeader } from '../common/TableHeader/TableHeader'
import { AddCardModal } from '../modals/AddCardModal'

import s from './cards.module.css'
import { CardsList } from './CardsList/CardsList'

export const Cards = () => {
  const cards = useAppSelector(cardsSelector)
  const searchByAnswer = useAppSelector(searchCardsByAnswerSelector)
  const searchByQuestion = useAppSelector(searchCardsByQuestionSelector)
  const cardsTotalCount = useAppSelector(cardsTotalCountSelector)
  const profile = useAppSelector(profileInfoSelector)
  const packUserData = useAppSelector(packUserDataSelector)
  const [params, setParams] = useState<CardsParamsType>({ cardsPack_id: packUserData.packId })
  const [cardsPerPage, setCardsPerPage] = useState<number>(4)
  const [page, setPage] = useState<number>(0)
  const [sort, setSort] = useState<string>('')

  const navigate = useNavigate()

  const dispatch = useAppDispatch()

  useEffect(() => {
    if (packUserData.packId) {
      dispatch(setCardsTC(packUserData.packId))
    }
  }, [searchByAnswer, searchByQuestion])

  const title =
    profile._id === packUserData.packUserId ? 'My Pack' : `${packUserData.packUserName}'s Pack`

  const buttonTitle =
    profile._id === packUserData.packUserId ? (
      <AddCardModal cardsPack_id={packUserData.packId} />
    ) : (
      'Learn to pack'
    )
  const onClickHandler = () => {
    if (profile._id !== packUserData.packUserId) {
      navigate('/learn')
    }
  }

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
        buttonName={<AddCardModal cardsPack_id={packUserData.packId} />}
        disable={cards.length === 0 && profile._id !== packUserData.packUserId}
        onClick={onClickHandler}
      />
      {packUserData.cardsCount !== 0 && (
        <div className={s.filters}>
          <div className={s.items}>
            <SearchInput
              inputName={'Search by Question'}
              searchSelector={searchCardsByQuestionSelector}
              setSearch={setSearchCardsByQuestion}
            />
          </div>
          <div className={s.items}>
            <SearchInput
              inputName={'Search by Answer'}
              searchSelector={searchCardsByAnswerSelector}
              setSearch={setSearchCardsByAnswer}
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
        cards={cards}
      />
    </div>
  )
}
