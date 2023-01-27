import React from 'react'

import Rating from '@mui/material/Rating'

import {
  cardsTotalCountSelector,
  packStatusSelector,
  packUserDataSelector,
  pageCardSelector,
  pageCountCardSelector,
  profileInfoSelector,
} from '../../../../bll/selectors/selectors'
import { CardsType, setPageCard, setPageCountCard } from '../../../../bll/store/cards-reducer'
import { useAppDispatch, useAppSelector } from '../../../../hooks/hooks'
import { dateFormatUtils } from '../../../../utils/dateFormat/dateFormatUtils'
import { TableBodyComponent } from '../../common/Table/TableBody/TableBody'
import { TableComponent } from '../../common/Table/TableComponent'
import { TableHeadComponent } from '../../common/Table/TableHead/TableHead'
import { DeleteCardModal } from '../../modals/DeleteCardModal'
import { UpdateCardModal } from '../../modals/UpdateCardModal'

import s from './cardsList.module.css'

export interface ColumnCards {
  id: 'question' | 'answer' | 'updated' | 'grade'
  label: string
  minWidth?: number
  align?: 'right'
  format?: (value: number) => string
}

const columns: ColumnCards[] = [
  { id: 'question', label: 'Question' },
  { id: 'answer', label: 'Answer' },
  {
    id: 'updated',
    label: 'Last Updated',
  },
  {
    id: 'grade',
    label: 'Grade',
  },
]

export interface DataCards {
  question: string
  answer: string
  updated: string
  grade: JSX.Element
  id: string
}

type CardsListType = {
  cards: CardsType[]
  sort: string
  onChangeSort: (newSort: string) => void
}

export const CardsList = (props: CardsListType) => {
  const packUserData = useAppSelector(packUserDataSelector)
  const cardsTotalCount = useAppSelector(cardsTotalCountSelector)
  const profileInfo = useAppSelector(profileInfoSelector)
  const packUserStatus = useAppSelector(packStatusSelector)
  const pageCard = useAppSelector(pageCardSelector)
  const pageCountCard = useAppSelector(pageCountCardSelector)
  const dispatch = useAppDispatch()

  const onChangePageHandler = (page: number, pageCount: number) => {
    dispatch(setPageCard({ page: page }))
    dispatch(setPageCountCard({ pageCount: pageCount }))
  }

  function createData(
    question: string,
    answer: string,
    updated: string,
    grade: JSX.Element,
    id: string
  ): DataCards {
    return { question, answer, updated, grade, id }
  }

  const rows: DataCards[] = props.cards.map(card => {
    let grade

    profileInfo._id === card.user_id
      ? (grade = (
          <div>
            <Rating name="disabled" value={card.grade} disabled />
            <button className={s.button}>
              <UpdateCardModal
                _id={card._id}
                primaryQuestion={card.question}
                primaryAnswer={card.answer}
              />
            </button>
            <button className={s.button}>
              <DeleteCardModal id={card._id} />
            </button>
          </div>
        ))
      : (grade = (
          <div>
            <Rating name="disabled" value={card.grade} disabled />
          </div>
        ))

    return createData(card.question, card.answer, dateFormatUtils(card.updated), grade, card._id)
  })

  if (packUserData.cardsCount !== 0) {
    let columnsWithSort: string[] = ['question', 'answer', 'updated']

    return (
      <TableComponent
        totalCount={cardsTotalCount ? cardsTotalCount : 0}
        currentPage={pageCard ?? 1}
        pageCount={pageCountCard}
        onPageChanged={onChangePageHandler}
        labelRowsPerPage={'Cards per Page'}
        packUserStatus={packUserStatus}
      >
        <TableHeadComponent
          columns={columns}
          columnsWithSort={columnsWithSort}
          sort={props.sort}
          onChangeSort={props.onChangeSort}
        />
        <TableBodyComponent rows={rows} columns={columns} />
      </TableComponent>
    )
  } else {
    return <div className={s.empty}>This pack is empty</div>
  }
}
