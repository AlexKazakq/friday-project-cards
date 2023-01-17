import React from 'react'

import SearchIcon from '@mui/icons-material/Search'
import FormControl from '@mui/material/FormControl'
import InputAdornment from '@mui/material/InputAdornment'
import OutlinedInput from '@mui/material/OutlinedInput'
import { NavLink } from 'react-router-dom'

import { PATH } from '../../../assets/Routes/path'
import { packUserDataSelector, profileInfoSelector } from '../../../bll/selectors/selectors'
import { useAppSelector } from '../../../hooks/hooks'
import tableStyle from '../../styles/table.module.css'
import { TableHeader } from '../common/TableHeader/TableHeader'

import s from './cards.module.css'
import { CardsList } from './CardsList/CardsList'

export const Cards = () => {
  const profile = useAppSelector(profileInfoSelector)
  const packUserData = useAppSelector(packUserDataSelector)
  const title =
    profile._id === packUserData.packUserId ? 'My Pack' : `${packUserData.packUserName}'s Pack`
  const buttonTitle = profile._id === packUserData.packUserId ? 'Add new pack' : 'Learn to pack'

  debugger

  return (
    <div className={tableStyle.wrapper}>
      <div>
        <NavLink to={PATH.PACKS} className={s.back}>
          Back to Packs List
        </NavLink>
      </div>
      <TableHeader title={title} buttonName={buttonTitle} />
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
