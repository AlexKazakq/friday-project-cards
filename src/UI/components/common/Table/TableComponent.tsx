import React, { FC } from 'react'

import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableContainer, { TableContainerProps } from '@mui/material/TableContainer'

import { searchStatusType } from '../../../../bll/store/packUserData-reducer'
import { PaginationComponent } from '../Pagination/PaginationComponent'

import s from './tableComponent.module.css'

type TableComponentPropsType = TableContainerProps & {
  totalCount: number
  currentPage: number
  pageCount: number
  onPageChanged: (page: number, pageCount: number) => void
  labelRowsPerPage: string
  packUserStatus?: searchStatusType
}

export const TableComponent: FC<TableComponentPropsType> = ({
  children,
  totalCount,
  currentPage,
  pageCount,
  onPageChanged,
  labelRowsPerPage,
  packUserStatus,
}) => {
  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 640 }}>
        <Table stickyHeader aria-label="sticky table">
          {children}
        </Table>
      </TableContainer>
      {(totalCount === 0 || packUserStatus === 'Wait...') && (
        <div className={s.notFound}>{packUserStatus}</div>
      )}
      <PaginationComponent
        totalCount={totalCount ? totalCount : 0}
        currentPage={currentPage ?? 1}
        pageCount={pageCount}
        onPageChanged={onPageChanged}
        labelRowsPerPage={labelRowsPerPage}
      />
    </Paper>
  )
}
