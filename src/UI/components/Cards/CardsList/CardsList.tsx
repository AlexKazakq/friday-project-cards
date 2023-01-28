import React from 'react'

import {
  cardsTotalCountSelector,
  packStatusSelector,
  packUserCountCardsSelector,
  pageCardSelector,
  pageCountCardSelector,
} from '../../../../bll/selectors/selectors'
import { setPageCard, setPageCountCard } from '../../../../bll/store/cards-reducer'
import { useAppDispatch, useAppSelector } from '../../../../hooks/hooks'
import { TableBodyComponent } from '../../common/Table/TableBody/TableBody'
import { TableComponent } from '../../common/Table/TableComponent'
import { TableHeadComponent } from '../../common/Table/TableHead/TableHead'

import { CardsColumns } from './CardsDataForTable/CardsColumns'
import { CardsRows } from './CardsDataForTable/CardsRows'
import s from './cardsList.module.css'

type CardsListType = {
  sort: string
  onChangeSort: (newSort: string) => void
}

export const CardsList = (props: CardsListType) => {
  const cardsTotalCount = useAppSelector(cardsTotalCountSelector)
  const packUserStatus = useAppSelector(packStatusSelector)
  const pageCard = useAppSelector(pageCardSelector)
  const pageCountCard = useAppSelector(pageCountCardSelector)
  const dispatch = useAppDispatch()
  const rows = CardsRows()
  const columns = CardsColumns()
  const packUserCardsCount = useAppSelector(packUserCountCardsSelector)
  const onChangePageHandler = (page: number, pageCount: number) => {
    dispatch(setPageCard({ page: page }))
    dispatch(setPageCountCard({ pageCount: pageCount }))
  }

  if (packUserCardsCount !== 0) {
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
        <TableBodyComponent rows={rows} columns={columns} packUserStatus={packUserStatus} />
      </TableComponent>
    )
  } else {
    return <div className={s.empty}>This pack is empty</div>
  }
}
