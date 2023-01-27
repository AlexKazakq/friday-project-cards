import React, { FC } from 'react'

import Skeleton from '@mui/material/Skeleton'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableRow from '@mui/material/TableRow'

import { searchStatusType } from '../../../../../bll/store/packUserData-reducer'
import { ColumnCards } from '../../../Cards/CardsList/CardsDataForTable/CardsColumns'
import { DataCards } from '../../../Cards/CardsList/CardsDataForTable/CardsRows'
import { ColumnPacks } from '../../../Packs/PacksList/PacksDataForTable/PackColumns'
import { DataPacks } from '../../../Packs/PacksList/PacksDataForTable/PackRows'

import s from './tableBody.module.css'

type TableBodyType = {
  rows: DataPacks[] | DataCards[]
  columns: ColumnPacks[] | ColumnCards[]
  packUserStatus?: searchStatusType
}
export const TableBodyComponent: FC<TableBodyType> = ({ rows, columns, packUserStatus }) => {
  return (
    <TableBody>
      {rows.map(row => {
        return (
          <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
            {columns.map(column => {
              const value = row[column.id as keyof typeof row]

              return (
                <TableCell key={column.id} align={column.align} className={s.tableCell}>
                  {packUserStatus === 'Wait...' ? (
                    <Skeleton width="80%" height="35px" animation={false} />
                  ) : (
                    value
                  )}
                </TableCell>
              )
            })}
          </TableRow>
        )
      })}
    </TableBody>
  )
}
