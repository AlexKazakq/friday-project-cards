import React, { ChangeEvent } from 'react'

import SearchIcon from '@mui/icons-material/Search'
import FormControl from '@mui/material/FormControl'
import InputAdornment from '@mui/material/InputAdornment'
import OutlinedInput from '@mui/material/OutlinedInput'

import s from './SearchInput.module.css'

type SearchInputType = {
  inputName: string
  searchName: string
  setParamName: (name: string) => void
}
export const SearchInput = (props: SearchInputType) => {
  let Search = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    props.setParamName(e.currentTarget.value)
  }

  return (
    <div className={s.items}>
      <span className={s.title}>{props.inputName}</span>
      <FormControl size={'small'} fullWidth>
        <OutlinedInput
          id="outlined-adornment-amount"
          onChange={Search}
          value={props.searchName}
          startAdornment={
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          }
          placeholder="Provide your text"
        />
      </FormControl>
    </div>
  )
}
