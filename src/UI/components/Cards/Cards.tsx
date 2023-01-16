import React from 'react'

import SearchIcon from '@mui/icons-material/Search'
import FormControl from '@mui/material/FormControl'
import InputAdornment from '@mui/material/InputAdornment'
import OutlinedInput from '@mui/material/OutlinedInput'
import { NavLink } from 'react-router-dom'

import { PATH } from '../../../assets/Routes/path'
import tableStyle from '../../styles/table.module.css'
import { TableHeader } from '../common/TableHeader/TableHeader'

import s from './cards.module.css'
import { CardsList } from './CardsList/CardsList'

export const Cards = () => {
  return (
    <div className={tableStyle.wrapper}>
      <div>
        <NavLink to={PATH.PACKS} className={s.back}>
          Back to Packs List
        </NavLink>
      </div>
      <TableHeader title={'Friends Card'} buttonName={'Learn to pack'} />
      <div className={s.items}>
        <span className={s.title}>Search</span>
        <FormControl size={'small'} sx={{ width: '20%' }}>
          <OutlinedInput
            id="outlined-adornment-amount"
            startAdornment={
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            }
            placeholder="Provide your text"
          />
        </FormControl>
      </div>
      <CardsList />
    </div>
  )
}
