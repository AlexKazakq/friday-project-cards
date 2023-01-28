import React from 'react'

import {
  cardPacksTotalCountSelector,
  packStatusSelector,
  pageCountPackSelector,
  pagePackSelector,
} from '../../../../bll/selectors/selectors'
import { setPageCountPack, setPagePack } from '../../../../bll/store/packs-reducer'
import { useAppDispatch, useAppSelector } from '../../../../hooks/hooks'
import { TableBodyComponent } from '../../common/Table/TableBody/TableBody'
import { TableComponent } from '../../common/Table/TableComponent'
import { TableHeadComponent } from '../../common/Table/TableHead/TableHead'

import { PackColumns } from './PacksDataForTable/PackColumns'
import { PackRows } from './PacksDataForTable/PackRows'

type PacksListType = {
  sort: string
  onChangeSort: (newSort: string) => void
}
export const PacksList = (props: PacksListType) => {
  const packUserStatus = useAppSelector(packStatusSelector)
  const pagePack = useAppSelector(pagePackSelector)
  const pageCountPack = useAppSelector(pageCountPackSelector)
  const cardPacksTotalCount = useAppSelector(cardPacksTotalCountSelector)
  const dispatch = useAppDispatch()

  const rows = PackRows()
  const columns = PackColumns()

  let columnsWithSort = ['name', 'cardsCount', 'updated', 'created']
  const onChangePageHandler = (page: number, pageCount: number) => {
    dispatch(setPagePack({ page: page }))
    dispatch(setPageCountPack({ pageCount: pageCount }))
  }

  return (
    <TableComponent
      totalCount={cardPacksTotalCount ? cardPacksTotalCount : 0}
      currentPage={pagePack ?? 1}
      pageCount={pageCountPack}
      onPageChanged={onChangePageHandler}
      labelRowsPerPage={'Packs per Page'}
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
}
