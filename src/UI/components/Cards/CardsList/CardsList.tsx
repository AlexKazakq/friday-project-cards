import React, { useEffect, useState } from 'react'

import Paper from '@mui/material/Paper'
import Rating from '@mui/material/Rating'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TablePagination from '@mui/material/TablePagination'
import TableRow from '@mui/material/TableRow'

import {
  cardPacksSelector,
  cardsSelector,
  packUserDataSelector,
} from '../../../../bll/selectors/selectors'
import { setCardsWithParamsTC } from '../../../../bll/store/cards-reducer'
import { useAppDispatch, useAppSelector } from '../../../../hooks/hooks'

interface Column {
  id: 'question' | 'answer' | 'updated' | 'grade'
  label: string
  minWidth?: number
  align?: 'right'
  format?: (value: number) => string
}

const columns: readonly Column[] = [
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

interface Data {
  question: string
  answer: string
  updated: string
  grade: any
}

export const CardsList = () => {
  const cardPacks = useAppSelector(cardPacksSelector)
  const cards = useAppSelector(cardsSelector)
  const [page, setPage] = useState(0)
  const [cardsPerPage, setCardsPerPage] = useState(10)
  const packUserData = useAppSelector(packUserDataSelector)
  const dispatch = useAppDispatch()

  console.log(cardPacks)
  useEffect(() => {
    if (packUserData.packId) {
      dispatch(setCardsWithParamsTC({ cardsPack_id: packUserData.packId }))
    }
  }, [])

  function createData(question: string, answer: string, updated: string, grade: any): Data {
    return { question, answer, updated, grade }
  }

  const rows: Data[] = cards.map(card => {
    const grade = <Rating name="disabled" value={card.grade} disabled />

    return createData(card.question, card.answer, card.updated, grade)
  })

  console.log(rows)
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCardsPerPage(+event.target.value)
    setPage(0)
  }

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map(column => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.slice(page * cardsPerPage, page * cardsPerPage + cardsPerPage).map(row => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.answer}>
                  {columns.map(column => {
                    const value = row[column.id]

                    return (
                      <TableCell key={column.id} align={column.align}>
                        {value}
                      </TableCell>
                    )
                  })}
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        sx={{}}
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={cardsPerPage}
        page={page}
        labelRowsPerPage={'Cards per page'}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  )
}