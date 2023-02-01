import React, { useEffect } from 'react'

import { useNavigate } from 'react-router-dom'

import {
  cardsSelector,
  packUserCountCardsSelector,
  packUserDataSelector,
  pageCardSelector,
  pageCountCardSelector,
  profileInfoSelector,
  searchCardsByAnswerSelector,
  searchCardsByQuestionSelector,
  sortCardsSelector,
} from '../../../bll/selectors/selectors'
import {
  setCardsTC,
  setSearchCardsByAnswer,
  setSearchCardsByQuestion,
  setSortCard,
} from '../../../bll/store/cards-reducer'
import { useAppDispatch, useAppSelector } from '../../../hooks/hooks'
import tableStyle from '../../styles/table.module.css'
import { BackArrow } from '../common/BackArrow/BackArrow'
import { SearchInput } from '../common/SearchInput/SearchInput'
import { TableHeader } from '../common/TableHeader/TableHeader'
import { AddCardModal } from '../Modals/CardsModals/AddCardModal'

import s from './cards.module.css'
import { CardsList } from './CardsList/CardsList'

export const Cards = () => {
  const cards = useAppSelector(cardsSelector)
  const searchByAnswer = useAppSelector(searchCardsByAnswerSelector)
  const searchByQuestion = useAppSelector(searchCardsByQuestionSelector)
  const profile = useAppSelector(profileInfoSelector)
  const packUserData = useAppSelector(packUserDataSelector)
  const sort = useAppSelector(sortCardsSelector)
  const pageCard = useAppSelector(pageCardSelector)
  const pageCountCard = useAppSelector(pageCountCardSelector)
  const packUserCountCards = useAppSelector(packUserCountCardsSelector)

  const navigate = useNavigate()

  const dispatch = useAppDispatch()

  useEffect(() => {
    if (packUserData.packId) {
      dispatch(setCardsTC(packUserData.packId))
    }
  }, [searchByAnswer, searchByQuestion, sort, pageCard, pageCountCard])

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

  const onChangeSort = (newSort: string) => {
    dispatch(setSortCard({ sort: newSort }))
  }

  return (
    <div className={tableStyle.wrapper}>
      <BackArrow />
      <TableHeader
        title={title}
        buttonName={buttonTitle}
        isNotButton={cards.length === 0 && profile._id !== packUserData.packUserId}
        onClick={onClickHandler}
      />
      {packUserCountCards !== 0 && (
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
      <CardsList sort={sort} onChangeSort={onChangeSort} />
    </div>
  )
}
