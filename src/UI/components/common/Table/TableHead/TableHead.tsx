import React, { FC } from 'react'

import TableCell from '@mui/material/TableCell'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'

import { ColumnCards } from '../../../Cards/CardsList/CardsList'
import { ColumnPacks } from '../../../Packs/PacksList/PacksList'
import SuperSort from '../../SuperSort/SuperSort'

type TableHeadType = {
  columns: ColumnPacks[] | ColumnCards[]
  columnsWithSort: string[]
  sort: string
  onChangeSort: (newSort: string) => void
}
export const TableHeadComponent: FC<TableHeadType> = ({
  columns,
  columnsWithSort,
  sort,
  onChangeSort,
}) => {
  return (
    <TableHead>
      <TableRow>
        {columns.map(column => (
          <TableCell key={column.id} align={column.align} style={{ minWidth: column.minWidth }}>
            {column.label}
            {columnsWithSort.map(el => {
              if (column.id === el) {
                return (
                  <SuperSort
                    sort={sort}
                    value={column.id}
                    onChange={onChangeSort}
                    key={column.id}
                  />
                )
              }
            })}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  )
}
