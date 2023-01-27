import React, { useEffect } from 'react'

import { NavLink, useNavigate } from 'react-router-dom'

import { PATH } from '../../../assets/Routes/path'
import {
  cardsSelector,
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
import { SearchInput } from '../common/SearchInput/SearchInput'
import { TableHeader } from '../common/TableHeader/TableHeader'
import { AddCardModal } from '../modals/AddCardModal'

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
      <div>
        <NavLink to={PATH.PACKS} className={s.back}>
          Back to Packs List
        </NavLink>
      </div>
      <TableHeader
        title={title}
        buttonName={buttonTitle}
        isNotButton={cards.length === 0 && profile._id !== packUserData.packUserId}
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
      <CardsList sort={sort} onChangeSort={onChangeSort} />
    </div>
  )
}
