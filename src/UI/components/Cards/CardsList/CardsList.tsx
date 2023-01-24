import React from 'react'

import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import EditIcon from '@mui/icons-material/Edit'
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
  cardsTotalCountSelector,
  packStatusSelector,
  packUserDataSelector,
  profileInfoSelector,
} from '../../../../bll/selectors/selectors'
import { CardsType } from '../../../../bll/store/cards-reducer'
import { useAppSelector } from '../../../../hooks/hooks'
import { dateFormatUtils } from '../../../../utils/dateFormat/dateFormatUtils'
import SuperSort from '../../common/SuperSort/SuperSort'

import s from './cardsList.module.css'

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
  grade: JSX.Element
}

type CardsListType = {
  cards: CardsType[]
  page: number
  cardsPerPage: number
  handleChangeRowsPerPage: (event: React.ChangeEvent<HTMLInputElement>) => void
  changePage: (event: unknown, newPage: number) => void
  sort: string
  onChangeSort: (newSort: string) => void
}

export const CardsList = (props: CardsListType) => {
  const packUserData = useAppSelector(packUserDataSelector)
  const cardsTotalCount = useAppSelector(cardsTotalCountSelector)
  const profileInfo = useAppSelector(profileInfoSelector)
  const packUserStatus = useAppSelector(packStatusSelector)

  function createData(question: string, answer: string, updated: string, grade: JSX.Element): Data {
    return { question, answer, updated, grade }
  }

  const rows: Data[] = props.cards.map(card => {
    let grade

    profileInfo._id === card.user_id
      ? (grade = (
          <div>
            <Rating name="disabled" value={card.grade} disabled />
            <button className={s.button}>
              <EditIcon />
            </button>
            <button className={s.button}>
              <DeleteForeverIcon />
            </button>
          </div>
        ))
      : (grade = (
          <div>
            <Rating name="disabled" value={card.grade} disabled />
          </div>
        ))

    return createData(card.question, card.answer, dateFormatUtils(card.updated), grade)
  })

  if (packUserData.cardsCount !== 0) {
    return (
      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <TableContainer sx={{ maxHeight: 640 }}>
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
                    <SuperSort sort={props.sort} value={column.id} onChange={props.onChangeSort} />
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map(row => {
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
        {props.cards.length === 0 && <div className={s.notFound}>{packUserStatus}</div>}
        <TablePagination
          sx={{}}
          rowsPerPageOptions={[4, 6, 10, 50]}
          component="div"
          count={cardsTotalCount}
          rowsPerPage={props.cardsPerPage}
          page={props.page}
          labelRowsPerPage={'Cards per page'}
          onPageChange={props.changePage}
          onRowsPerPageChange={props.handleChangeRowsPerPage}
        />
      </Paper>
    )
  } else {
    return <div className={s.empty}>This pack is empty</div>
  }
}
