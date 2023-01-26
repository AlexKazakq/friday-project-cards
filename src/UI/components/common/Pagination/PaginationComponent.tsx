import React, { useEffect, useState } from 'react'

import TablePagination from '@mui/material/TablePagination'

type PaginationComponentType = {
  totalCount: number
  currentPage: number
  pageCount: number
  onPageChanged: (page: number, pageCount: number) => void
  labelRowsPerPage: string
}
export const PaginationComponent = (props: PaginationComponentType) => {
  const [cardsPerPage, setCardsPerPage] = useState<number>(props.pageCount)
  const [page, setPage] = useState<number>(props.currentPage)

  useEffect(() => {
    setCardsPerPage(props.pageCount)
  }, [props.pageCount])

  useEffect(() => {
    setPage(props.currentPage)
  }, [props.currentPage])

  useEffect(() => {
    props.onPageChanged(page, cardsPerPage)
  }, [cardsPerPage, page])
  const changePage = (event: unknown, newPage: number) => {
    setPage(newPage + 1)
  }
  const ChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCardsPerPage(+event.target.value)
  }

  return (
    <TablePagination
      sx={{}}
      rowsPerPageOptions={[4, 6, 10]}
      component="div"
      count={props.totalCount}
      rowsPerPage={cardsPerPage}
      page={props.currentPage - 1}
      labelRowsPerPage={props.labelRowsPerPage}
      onPageChange={changePage}
      onRowsPerPageChange={ChangeRowsPerPage}
      showFirstButton
      showLastButton
    />
  )
}
